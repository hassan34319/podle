"use client";
import { inter } from "@/app/utils/inter";
import React from "react";
import SampleCard from "./SampleCard";
import { SampleServices } from "@/app/utils/Dataset";
import { ArrowRight } from "./Arrow";
import ArrowLeft from "./Arrow";
import { useStateContext } from "@/app/context/stateContext";
import Link from "next/link";
type Props = {
  gigs: Gig[];
};

function UserGigs({ gigs }: Props) {
  const { samplePage, setSamplePage } = useStateContext();

  const itemsPerPage = 4; // Number of gigs per page
  const startIndex = (samplePage - 1) * itemsPerPage;
  const endIndex = samplePage * itemsPerPage;

  // Extract the gigs for the current page

  const displayedGigs = gigs ? gigs.slice(startIndex, endIndex) : 0;

  const totalPages = gigs ? Math.ceil(gigs.length / itemsPerPage) : 1;

  return (
    <div className="bg-[#EEE8DA] h-max pb-[5vh] ">
      {/* Main Heading */}
      <div className="flex md:flex-row flex-col pt-[5vh] md:justify-between px-[4%] pb-[5vh]">
        <h1 className={`  text-3xl font-bold mb-4 md:mb-0`}>
          Gigs from this Seller
        </h1>
        <Link
          href={"/serviceProvider/addGig"}
          className={`bg-white flex items-center justify-center h-[8vh] md:w-[30%] w-[90%]   md:mt-0 border-[#16A235] border-[0.5px] border-opacity-50 text-center px-2 rounded-lg text-[#16A235] font-medium text-lg`}
        >
          Add a service
        </Link>
      </div>
      {/* Sample Cards */}
      {gigs && gigs.length >0 && (
        <div className="flex flex-row justify-between px-[4%] h-max ">
          {gigs.map((item, index) => (
            <SampleCard
              key={item._id}
              index={index}
              title={item.title}
              category={item.category}
              image={item.imageUrl}
              rating={item.rating}
              price={item.basicPackage.price}
            />
          ))}
        </div>
      )}
      {!gigs && 
      <div className="text-black flex items-center justify-center my-10 mx-10">No Gigs</div>
      }

      <div className={`flex flex-row ${inter.className} px-[4%] pt-[4vh]`}>
        <span className="text-4xl text-[#16A235] font-medium">
          {samplePage < 10 ? `0${samplePage}` : samplePage}
        </span>
        <span className="font-medium text-black">
          /{totalPages < 10 ? `0${totalPages}` : totalPages}
        </span>
        <div className="ml-[10%] mt-[1vh]">
          <ArrowLeft  />
        </div>
        <div className="ml-[1%] mt-[1vh]">
          <ArrowRight totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

export default UserGigs;
