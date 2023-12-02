import { inter } from "@/app/utils/inter";
import { renderRatingStars, renderRatingStarsLarge } from "@/app/utils/stars";
import React from "react";

import { ReviewerData } from "@/app/utils/Dataset";
import ReviewCard from "@/app/serviceProvider/dashboard/(UserComponents)/ReviewCard";

type Props = {
  reviews : Review[]
  rating : number;
};

function SellerReviews({reviews,rating}: Props) {
  
  return (
    <div className="h-max pb-[5vh] pt-[5vh] px-[4%]">
      {/* Top Contents */}
      <div className="flex md:flex-row flex-col justify-between">
        {/* Heading and Rating */}
        <div className={` ${inter.className} flex flex-col text-sm md:text-base`}>
          <h1 className={` text-3xl font-medium`}>Reviews for this Seller</h1>
          <div className="flex flex-row space-x-2 mt-[2vh]">
            {renderRatingStarsLarge(rating).map((star, index) => (
              <span key={index}>{star}</span>
            ))}
            <p className="text-black text-xl font-semibold">{rating && rating}</p>
            <p className="text-black text-xl font-semibold">({reviews && reviews.length >0 && reviews.length})</p>
          </div>
        </div>
        {/* Rating */}
        {/* Review Button */}
      </div>
      <div className="flex flex-col mt-[5vh]">
      {reviews && reviews.length > 0 ? (
          reviews.map((user, index) => (
            <ReviewCard
              key={index}
              title={user.buyerName}
              image={user.buyerImage}
              description={user.reviewText}
              date={user.date}
            />
          ))
        ) : (
          <div>No Reviews Yet</div>
        )}
      </div>
      <div className="text-right underline text-[#16A235] mt-[2vh]">
        <p className={` ${inter.className} font-medium `}>View all</p>
      </div>
    </div>
  );
}

export default SellerReviews;
