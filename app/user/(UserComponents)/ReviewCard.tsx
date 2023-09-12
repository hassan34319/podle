import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  image: string;
  description: string;
  date: string;
};

function ReviewCard({ title, image, description, date }: Props) {
  return (
    <div className="flex flex-row md:h-[20vh] h-[30vh] border-b border-black border-opacity-72 mt-[3vh]">
      {/* Reviewer Image */}
      <div className="h-[16vh] md:w-[12%] w-[40%] relative ">
        <Image src={image} alt="Profile Icon" fill className="object-contain" />
      </div>
      {/* Reviewer Details */}
      <div className={`flex flex-col justify-between py-[2vh] px-[4vh]`}>
        <p className="font-semibold md:text-lg text-base">{title}</p>
        <p className="font-regular text-sm md:text-bae">{description}</p>
        <p className="font-medium md:text-lg text-base opacity-50">{date}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
