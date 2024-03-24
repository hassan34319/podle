"use client";
import { renderRatingStars } from "@/app/utils/stars";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  image: string;
  description: string;
  date: string;
  reviewRating: number;
};

function ReviewCard({ title, image, description, date, reviewRating }: Props) {
  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate: string = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }
  console.log("Review details", title, image, date);
  return (
    <div className="flex flex-row md:h-[20vh] h-[30vh] border-b border-black border-opacity-72 mt-[3vh]">
      {/* Reviewer Image */}
      <div className="relative w-20 h-20 overflow-hidden  py-10 rounded-full  ">
        <Image
          src={image}
          alt="Profile Icon"
          fill
          className="object-cover w-full h-full rounded-full "
        />
      </div>
      {/* Reviewer Details */}
      <div className={`flex flex-col justify-between py-[2vh] px-[4vh]`}>
        <p className="font-semibold md:text-lg text-base">{title}</p>
        <div className="flex flex-row gap-x-2">
          {renderRatingStars(reviewRating).map((star, index) => (
            <span key={index}>{star}</span>
          ))}
        </div>
        <p className="font-regular text-sm md:text-bae">{description}</p>
        <p className="font-medium md:text-lg text-base opacity-50">
          {formatDate(date)}
        </p>
      </div>
    </div>
  );
}

export default ReviewCard;
