import LoggedNavbar from "@/app/(UIComponents)/LoggedNavbar";
import Accept from "@/app/serviceProvider/order/(OrderComponents)/Accept";
import { client } from "@/app/utils/client";
import { getSessionServer } from "@/app/utils/getCurrentUser";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import ContentOrderMain from "./(orderComponenents)/ContentOrderMain";

interface Order {
  buyerEmail: string;
  _id: string;
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

  if (session.user?.name === "serviceProvider") {
    redirect("/serviceProvider/dashboard");
  }

  // Fetch the document based on the email field
  const orders = await client
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
    <ContentOrderMain orders={orders} ordersWithNames={ordersWithNames}/>
  );
}

export default ContentPage;
