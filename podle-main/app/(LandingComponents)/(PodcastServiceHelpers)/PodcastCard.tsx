import { useStateContext } from "@/app/context/stateContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  classname: string;
  src: string;
  title: string;
};

function PodcastCard({ classname, src, title }: Props) {
  const {selectedCategory, setSelectedCategory} = useStateContext()
  console.log;
  return (
    <Link href="/services" className={`relative h-[30vh] cursor-pointer lg:h-[60vh] w-[40%] lg:w-[27%] ${classname}`} onClick={()=>setSelectedCategory(title)}>
      <div className="bg-black bg-opacity-40 z-30 h-[30vh] lg:h-[60vh] relative" />
      <Image
        src={src}
        alt={title}
        fill
        className="object-cover "
      />
      <div className="text-white text-center  font-extrabold mt-[-15vh] lg:mt-[-30vh] lg:text-xl z-50  relative bg-transparent bg-opacity-0 opacity-100">{title}</div>
    </Link>
  );
}

export default PodcastCard;
