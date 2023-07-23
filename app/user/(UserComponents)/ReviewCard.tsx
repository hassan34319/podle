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
    <div className="flex flex-row h-[20vh] border-b border-black border-opacity-72 mt-[3vh]">
      {/* Reviewer Image */}
      <div className="h-[13vh] w-[12%] relative ">
        <Image src={image} alt="Profile Icon" fill className="object-contain" />
      </div>
      {/* Reviewer Details */}
      <div className={`flex flex-col justify-between py-[2vh] px-[4vh]`}>
        <p className="font-semibold text-lg">{title}</p>
        <p className="font-regular">{description}</p>
        <p className="font-medium text-lg opacity-50">{date}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
