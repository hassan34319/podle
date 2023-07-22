import { inter } from "@/app/utils/inter";
import React from "react";
import { renderRatingStars } from "@/app/utils/stars";
type Props = {
    rating : number
    backgroundImage : string
    title : string
    Category : string
};

function ServiceCard({rating,backgroundImage,title, Category}: Props) {
    console.log(backgroundImage)
  const backgroundImageUrl = backgroundImage;
  return (
    <div
      className="bg-cover col-span-1 h-[40vh]"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div
        className={`bg-black relative bg-opacity-[77%] h-[14vh] w-full bg-bottom mt-[26vh] flex flex-col ${inter.className} px-4 py-2 justify-between `}
      >
        <p className="text-xl font-medium text-[#16A235] mb-1">{title}</p>
        <p className="text-white font-medium">Category: {Category}</p>
        <div className="flex flex-row">
          {renderRatingStars(rating).map((star, index) => (
            <span key={index}>{star}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
