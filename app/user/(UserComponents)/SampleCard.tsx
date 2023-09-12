import { inter } from "@/app/utils/inter";
import { renderRatingStars } from "@/app/utils/stars";
import Image from "next/image";
import React from "react";

type Props = {
    title : string
    category : string,
    image : string,
    rating : number
    price : string
    index : number;
};

function SampleCard({title,category,image,rating,price,index}: Props) {
  return (
    <div className={`h-max bg-white rounded-3xl pt-[2vh] pb-[2vh] lg:w-[24%] md:w-[48%] w-[90%] drop-shadow-lg border-black border-[0.5px] border-opacity-30 ${index>0? "hidden md:block" : ""}  ${index>1? "md:hidden lg:block" : ""}`}>
      <div className="h-[16vh] w-[90%] relative   mx-[5%] ">
        <Image
          src={image}
          alt={title}
          className="object-cover rounded-xl"
          fill
        />
      </div>
      <div className={`flex flex-col ${inter.className} mt-[1vh] mx-[5%]`}>
        <p className="font-normal text-sm">{category}</p>
        <p className="font-semibold text-xl mt-[1vh]">{title}</p>
        <div className="flex flex-row space-x-1 mt-[1vh]">
          {renderRatingStars(rating).map((star, index) => (
            <span key={index}>{star}</span>
          ))}
        </div>
        <button  className="mt-[1.5vh] rounded-lg w-[30%] bg-black px-1 py-1 text-sm text-white font-medium border-black border-[0.5px]">{price}</button>
      </div>
    </div>
  );
}

export default SampleCard;
