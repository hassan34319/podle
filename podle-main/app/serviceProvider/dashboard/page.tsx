import LoggedNavbar from "@/app/(UIComponents)/LoggedNavbar";
import { client } from "@/app/utils/client";
import { getSessionServer } from "@/app/utils/getCurrentUser";
import { urlFor } from "@/app/utils/UrlImage";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import Footer from "../../(UIComponents)/Footer";
import MobileLogo from "../../(UIComponents)/MobileLogo";
import MobileNavbar from "../../(UIComponents)/MobileNavbar";
import SecondaryNavbar from "../../(UIComponents)/SecondaryNavbar";
import UserDetails from "./(UserComponents)/UserDetails";
import UserReviews from "./(UserComponents)/UserReviews";
import UserGigs from "./(UserComponents)/UserSamples";
import UserSamples from "./(UserComponents)/UserSamples";

type Props = {};

async function UserPage({}: Props) {
  const session = await getSessionServer();
  const searchEmail = session?.user?.email; // Replace with the email you want to search

  if (!session) {
    redirect("/login");
  }

  if (session.user?.name === "contentCreator") {
    redirect("/contentCreator/dashboard");
  }
  // Fetch the document based on the email field
  const user = await client
    .fetch('*[_type == "claimedBusiness" && email == $email][0]', {
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

  if (!user.name || !user.logo || !user.streetAddress) {
    redirect("/claimedBusiness");
  }

  const gigs = await client
    .fetch('*[_type == "gig" && sellerEmail == $email]', {
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

  const reviews = await client
    .fetch('*[_type == "review" && sellerEmail == $email]', {
      email: searchEmail,
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
    });

  let cummulativeRating = 0;
  let Reviews = []

  if (reviews && reviews.length > 0) {
    // Initialize an array to store combined reviews

    // Initialize variables for cumulative rating calculation
    let totalRating = 0;

    // Iterate through each review
    for (const review of reviews) {
      // Fetch buyer details using buyer's email from each review
      const buyerDetails = await client
        .fetch('*[_type == "claimedBusiness" && email == $email][0]', {
          email: review.buyerEmail,
        })
        .catch((error) => {
          console.error("Error fetching buyer details:", error);
        });

      // Push combined review data into the Reviews array
      if (buyerDetails) {
        Reviews.push({
          reviewText: review.reviewText,
          reviewRating: review.reviewRating,
          buyerName: buyerDetails.name, // Assuming 'name' field exists in claimedBusiness
          buyerImage: urlFor(buyerDetails.logo).url(), // Assuming 'logo' field exists in claimedBusiness
          date : review._createdAt
        });

        // Add the rating to the total for cumulative calculation
        totalRating += review.reviewRating;
      }

      else {
        const buyerDetails2 = await client
        .fetch('*[_type == "contentCreator" && email == $email][0]', {
          email: review.buyerEmail,
        })
        .catch((error) => {
          console.error("Error fetching buyer details:", error);
        });

        if (buyerDetails2) {
          Reviews.push({
            reviewText: review.reviewText,
            reviewRating: review.reviewRating,
            buyerName: buyerDetails2.userName, // Assuming 'name' field exists in claimedBusiness
            buyerImage: buyerDetails2.profileImage, // Assuming 'logo' field exists in claimedBusiness
            date : review._createdAt
          });
  
          // Add the rating to the total for cumulative calculation
          totalRating += review.reviewRating;
        }
      }
    }

    // Calculate cumulative rating
    cummulativeRating = Math.round(totalRating / reviews.length);

    // Now, `Reviews` array contains all combined reviews with buyer details
    console.log("Combined Reviews:", Reviews);
    console.log("Cumulative Rating:", cummulativeRating);
  } else {
    console.log("No reviews found for this seller.");
  }

  return (
    <main className="top-0 mt-0 min-h-[100vh] text-black bg-[#E8DFCC]">
      <LoggedNavbar />
      <UserDetails user={user} rating={cummulativeRating} reviews={Reviews} />
      <UserGigs gigs={gigs} />
      <UserReviews  reviews={Reviews} rating={cummulativeRating} />
      <Footer />
    </main>
  );
}

export default UserPage;
