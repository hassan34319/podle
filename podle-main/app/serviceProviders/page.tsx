import React from "react";
import SecondaryNavbar from "../(UIComponents)/SecondaryNavbar";
import ServicesMain from "./(serviceProvidersComponents)/ServicesMain";
import ServiceCategories from "./(serviceProvidersComponents)/ServiceCategories";
import ServiceSearch from "./(serviceProvidersComponents)/ServiceSearch";
import Footer from "../(UIComponents)/Footer";
import MobileNavbar from "../(UIComponents)/MobileNavbar";
import MobileLogo from "../(UIComponents)/MobileLogo";
import Link from "next/link";
import PageCircle from "./(serviceProvidersComponents)/PageCircle";
import Image from "next/image";
import LoggedNavbar from "../(UIComponents)/LoggedNavbar";
import { client } from "../utils/client";

type Props = {};

export const revalidate = 60;

async function ServiceProviders({}: Props) {
  const unclaimedBusiness = await client.fetch('*[_type == "autoBusiness"]');
  const claimedBusiness = await client
  .fetch(
    '*[_type == "claimedBusiness" && !(_id match "draft*") && logo != "" && name!= ""]'
  )
  // let unclaimedBusiness2 = []; // Initialize an empty array to store updated businesses

  const unclaimedWithClaimedProperty = unclaimedBusiness.map((business : BusinessInfo) => ({
    ...business,
    claimed: false, // Set claimed to false for unclaimed businesses
  }));
  
  // Combine and map claimedBusiness
  const claimedWithClaimedProperty = claimedBusiness.map((business : ServiceProvider) => ({
    ...business,
    claimed: true, // Set claimed to true for claimed businesses
  }));
  
  // Combine both arrays
  const combinedBusinesses = [ ...claimedWithClaimedProperty, ...unclaimedWithClaimedProperty];

  // Loop over each business
  // for (const business of combinedBusinesses) {
  //   const reviews = await client
  //     .fetch('*[_type == "review" && businessName == $name]', {
  //       name: business.name,
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching reviews:", error);
  //     });
  
  //   let totalRating = 0;
  
  //   if (reviews && reviews.length > 0) {
  //     // Iterate through each review
  //     for (const review of reviews) {
  //       // Add the rating to the total for cumulative calculation
  //       totalRating += review.reviewRating;
  //     }
  
  //     // Calculate cumulative rating
  //     business.rating = Math.round(totalRating / reviews.length);
  //   } else {
  //     business.rating = 0; // Set rating to 0 if no reviews found
  //   }
  // }
  
  

  // if (unclaimedBusiness && unclaimedBusiness.length > 0) {
  //     // Iterate through each unclaimed business
  //     for (const business of unclaimedBusiness) {
  //         const title = business.name;

  //         // Fetch reviews for the current business
  //         const reviews = await client.fetch(`*[_type == 'review' && businessName == '${title}']{reviewRating}`);

  //         // Calculate the average rating
  //         let sumOfRatings = 0;
  //         let numberOfReviews = reviews.length;

  //         if (numberOfReviews > 0) {
  //           sumOfRatings = reviews.reduce((acc: number, review: { reviewRating: number }) => acc + review.reviewRating, 0);
  //         }

  //         const averageRating = numberOfReviews > 0 ? sumOfRatings / numberOfReviews : 0;

  //         // Add the averageRating to the business object
  //         const updatedBusiness = {
  //             ...business,
  //             averageRating: averageRating
  //         };
  //         console.log(updatedBusiness)
  //         // Push the updated business to the new array
  //         unclaimedBusiness2.push(updatedBusiness);
  //     }

  // } else {
  //     console.log("No unclaimed businesses found.");
  // }

  // console.log("Updated unclaimed businesses:", unclaimedBusiness2.length);

  const categories = ["Hot", "Recommended", "Top Rated"];

  return (
    <main className="top-0 mt-0 min-h-[100vh] text-black bg-[#E8DFCC] max-w-full">
      {/*  */}
      <LoggedNavbar />
      <ServiceSearch
        categories={categories}
        business={combinedBusinesses}
      />
      <ServiceCategories categories={categories} />
      <ServicesMain business={combinedBusinesses} />
      <Footer /> 
      {/* <PodcastServices /> */}
      {/* <Footer /> */}
    </main>
  );
}

export default ServiceProviders;
