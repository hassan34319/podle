import LoggedNavbar from "@/app/(UIComponents)/LoggedNavbar";
import { client } from "@/app/utils/client";
import { getSessionServer } from "@/app/utils/getCurrentUser";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import Accept from "./(OrderComponents)/Accept";
import Delivery from "./(OrderComponents)/delivery";
import Rate from "./(OrderComponents)/Rate";
import ServiceOrderMain from "./(OrderComponents)/ServiceOrderMain";

interface Order {
  _id: string;
  buyerEmail: string;
  _createdAt: string;
  sellerEmail: string;
  price: string;
  estimatedDelivery: string;
  status: string;
  gigID: string;
  packageName: string;
  buyerName?: string;
  sellerName?: string;
  gigName?: string;
}

type Props = {};
export const dynamic = "force-dynamic";
async function ContentPage({}: Props) {
 
  const session = await getSessionServer();
  const searchEmail = session?.user?.email; // Replace with the email you want to search
  const username = session?.user?.name;
  const fetchSellerName = async (email: string) => {
    try {
      const user = await client.fetch(
        `*[_type == "claimedBusiness" && email == $email][0]`,
        {
          email: email,
        }
      );
      return user?.name || ""; // Assuming 'name' is the field to fetch from the contentCreator type
    } catch (error) {
      console.error("Error fetching user:", error);
      return "";
    }
  };

  const fetchBuyerName = async (email: string) => {
    try {
      let user = await client.fetch(
        `*[_type == "contentCreator" && email == $email][0]`,
        {
          email: email,
        }
      );

      if (!user) {
        user = await client.fetch(
          `*[_type == "claimedBusiness" && email == $email][0]`,
          {
            email: email,
          }
        );
        return [user?.name, user?._id];
      } else {
        return [user?.userName, user?._id];
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return "";
    }
  };

  const fetchGigName = async (id: string) => {
    try {
      const gig = await client.fetch(`*[_type == "gig" && _id == $id][0]`, {
        id: id,
      });
      return gig?.title || ""; // Assuming 'name' is the field to fetch from the contentCreator type
    } catch (error) {
      console.error("Error fetching gig:", error);
      return "";
    }
  };

  if (!session) {
    redirect("/login");
  }

  if (session.user?.name === "contentCreatpr") {
    redirect("/contentCreator/dashboard");
  }

  // Fetch the document based on the email field
  const orders = await client
    .fetch('*[_type == "order" && sellerEmail == $email]', {
      email: searchEmail,
    })
    .then((document) => {
      if (document) {
        console.log("Document found:", document);
        return document;
      } else {
        console.log("Document not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching document:", error);
    });

  const ordersGiven = await client
    .fetch('*[_type == "order" && buyerEmail == $email]', {
      email: searchEmail,
    })
    .then((document) => {
      if (document) {
        console.log("Document found:", document);
        return document;
      } else {
        console.log("Document not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching document:", error);
    });

  const ordersWithNames = await Promise.all(
    orders &&
      orders.map(async (order: Order) => {
        const [buyerName, buyerId] = await fetchBuyerName(order.buyerEmail);
        const gigName = await fetchGigName(order.gigID);
        return {
          ...order,
          buyerName,
          gigName,
        };
      })
  );
  const ordersGivenWithNames = await Promise.all(
    ordersGiven &&
      ordersGiven.map(async (order: Order) => {
        const sellerName = await fetchSellerName(order.sellerEmail);
        const gigName = await fetchGigName(order.gigID);
        return {
          ...order,
          sellerName,
          gigName,
        };
      })
  );

  return (
    <ServiceOrderMain orders={orders} ordersGivenWithNames={ordersGivenWithNames} ordersWithNames={ordersWithNames}/>
  );
}

export default ContentPage;
