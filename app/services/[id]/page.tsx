import Footer from "@/app/(UIComponents)/Footer";
import LoggedNavbar from "@/app/(UIComponents)/LoggedNavbar";
import { client } from "@/app/utils/client";
import { urlFor } from "@/app/utils/UrlImage";
import React from "react";
import GigDisplay from "./GIgPageComponents)/GigDisplay";
import SellerReviews from "./GIgPageComponents)/SellerReviews";
import SellerGigs from "./GIgPageComponents)/SellerSamples";
import UserDisplay from "./GIgPageComponents)/UserDisplay";

type Props = {};
export const revalidate = 10;
async function Page({ params }: { params: { id: string } }) {


  const { id } = params;
  console.log(id)
  // Fetch the document based on the email field
    const selectedGig : Gig =  await client
    .fetch('*[_type == "gig" && _id == $id][0]', {
      id : id,
    })
    .then((document) => {
      if (document) {
        console.log("Seleted Gig", document);
        console.log("Seller Email", document.sellerEmail)
        return document;
      } else {
        console.log("Document not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching document:", error);
    });

    const searchEmail = selectedGig.sellerEmail
    console.log(searchEmail)

    const user  = await client
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
      <GigDisplay gig={selectedGig}/>
      <UserDisplay user={user} rating={cummulativeRating} reviews={Reviews} />
      <SellerGigs gigs={gigs} />
      <SellerReviews reviews={Reviews} rating={cummulativeRating}/>
      <Footer />
      {/* <PodcastServices />
    <Footer /> */}
    </main>
  );
}

export default Page;
