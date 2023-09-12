"use client"
import Logo from "@/app/(UIComponents)/Logo";
import MobileLogo from "@/app/(UIComponents)/MobileLogo";
import MobileNavbar from "@/app/(UIComponents)/MobileNavbar";
import { urlFor } from "@/app/utils/UrlImage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Image = {
  image: {
    asset: {
      url: string;
    };
  };
};

type Props = {
  homeImage: Image[]
};

function PodcastImage({homeImage}: Props) {
  console.log(homeImage,"Images")
  return (
    <div className="col-span-1 lg:mt-4 md:ml-3 md:mr-10 lg:mr-28">
      <div className="relative h-[60rem] lg:h-[60rem] md:h-[40rem] md:max-h-[95vh] max-h-[100vh] z-0">
        <div className="md:hidden flex flex-row justify-between z-30 relative pt-[8vh] items-center">
          <MobileNavbar />
          <MobileLogo />
          <Link
            href="/signup"
            className="cursor-pointer relative bg-black mr-[5%]  overflow-hidden flex flex-row lg:py-2 lg:px-6 px-3 h-max py-2 text-sm md:text-base rounded-sm md:rounded-none box-border items-center justify-center text-left  text-white font-inter"
          >
            <b className="relative">Sign Up</b>
          </Link>
        </div>
        <Image
          src={urlFor(homeImage[0].image).url()}
          alt="Podcast Girl"
          className="object-cover"
          fill
        />
      </div>
    </div>
  );
}

export default PodcastImage;
