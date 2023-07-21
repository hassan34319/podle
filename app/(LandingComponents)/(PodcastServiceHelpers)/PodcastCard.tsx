import Image from "next/image";
import React from "react";

type Props = {
  classname: string;
  src: string;
  title: string;
};

function PodcastCard({ classname, src, title }: Props) {
  console.log;
  return (
    <div className={`relative h-[60vh] w-[26%] ${classname}`}>
      <div className="bg-black bg-opacity-40 z-30 h-[60vh] relative" />
      <Image
        src={`${src}.png`}
        alt={title}
        fill
        className="object-cover "
      />
      <div className="text-white text-center  font-extrabold mt-[-30vh] text-xl z-50  relative bg-transparent bg-opacity-0 opacity-100">{title}</div>
    </div>
  );
}

export default PodcastCard;
