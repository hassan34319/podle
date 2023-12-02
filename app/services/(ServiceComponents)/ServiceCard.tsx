import { inter } from "@/app/utils/inter";
import React from "react";
import { renderRatingStars } from "@/app/utils/stars";
import Link from "next/link";
type Props = {
    rating : number
    _id : string;
    backgroundImage : string
    title : string
    Category : string
};

function ServiceCard({rating,backgroundImage,title, Category,_id}: Props) {
    console.log(backgroundImage)
  const backgroundImageUrl = backgroundImage;
  return (
    <Link
    href={`/services/${_id}`}
      className="bg-cover col-span-1 md:h-[30vh] h-[35vh]"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div
        className={`bg-black relative bg-opacity-[77%] md:h-[14vh] h-[12vh] w-full bg-bottom md:mt-[26vh] mt-[23vh] flex flex-col ${inter.className} px-4 py-2 justify-between `}
      >
        <p className="tex-base xl:text-xl font-medium text-[#16A235] mb-1">{title}</p>
        <p className="text-white font-medium">Category: {Category}</p>
        <div className="flex flex-row">
          {renderRatingStars(rating).map((star, index) => (
            <span key={index}>{star}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
