"use client";
import Logo from "@/app/(UIComponents)/Logo";
import MobileLogo from "@/app/(UIComponents)/MobileLogo";
import MobileNavbar from "@/app/(UIComponents)/MobileNavbar";
import { urlFor } from "@/app/utils/UrlImage";
import { signOut, useSession } from "next-auth/react";
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
  homeImage: Image[];
};

function PodcastImage({ homeImage }: Props) {
  console.log(homeImage, "Images");
  const session = useSession();
  return (
    <div className="col-span-1 lg:mt-4 lg:mr-28 lg:h-max">
      <div className="relative h-[60rem] xl:h-[60rem]  lg:max-h-[95vh]  max-h-[100vh] z-0">
        <div className="lg:hidden flex flex-row justify-between z-30 relative pt-[8vh] items-center">
          <MobileNavbar />
          <MobileLogo />
          {!session.data && (
            <Link
              href="/signup"
              className="cursor-pointer relative bg-black  overflow-hidden flex flex-row md:py-2 md:px-6 px-2 py-1 rounded-sm md:rounded-none box-border items-center justify-center text-left  text-white font-inter "
            >
              <b className="relative text-xs">Sign Up</b>
            </Link>
          )}
          {session.data && (
            <button
              onClick={() => signOut()}
              className="cursor-pointer relative bg-black  overflow-hidden flex flex-row md:py-2 md:px-4 px-2 py-2 rounded-sm md:rounded-none box-border items-center justify-center text-left  text-white font-inter mr-1 "
            >
              <b className="relative text-xs">Sign Out</b>
            </button>
          )}
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
