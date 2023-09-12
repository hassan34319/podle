import { inter } from "@/app/utils/inter";
import { renderRatingStars, renderRatingStarsLarge } from "@/app/utils/stars";
import React from "react";
import ReviewCard from "./ReviewCard";
import { ReviewerData } from "@/app/utils/Dataset";

type Props = {};

function UserReviews({}: Props) {
  return (
    <div className="h-max pb-[5vh] pt-[5vh] px-[4%]">
      {/* Top Contents */}
      <div className="flex md:flex-row flex-col justify-between">
        {/* Heading and Rating */}
        <div className={` ${inter.className} flex flex-col text-sm md:text-base`}>
          <h1 className={` text-3xl font-medium`}>Reviews for this Seller</h1>
          <div className="flex flex-row space-x-2 mt-[2vh]">
            {renderRatingStarsLarge(5).map((star, index) => (
              <span key={index}>{star}</span>
            ))}
            <p className="text-black text-xl font-semibold">5.0</p>
            <p className="text-black text-xl font-semibold">(45)</p>
          </div>
        </div>
        {/* Rating */}
        {/* Review Button */}
        <button
          className={`bg-white h-[8vh] md:w-[30%] w-[90%] mt-[3vh] md:mt-0 border-[#16A235] border-[0.5px] border-opacity-50 text-center px-2 rounded-lg text-[#16A235] ${inter.className} font-medium text-lg`}
        >
          Leave a Review
        </button>
      </div>
      <div className="flex flex-col mt-[5vh]">
        {ReviewerData.map((user, index) => (
          <ReviewCard
            key={index}
            title={user.title}
            image={user.image}
            description={user.description}
            date={user.date}
          />
        ))}
      </div>
      <div className="text-right underline text-[#16A235] mt-[2vh]">
        <p className={` ${inter.className} font-medium `}>View all</p>
      </div>
    </div>
  );
}

export default UserReviews;
