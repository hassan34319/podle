"use client";
import { inter } from "@/app/utils/inter";
import React from "react";
import SampleCard from "./SampleCard";
import { SampleServices } from "@/app/utils/Dataset";
import { ArrowRight } from "./Arrow";
import ArrowLeft from "./Arrow";
import { useStateContext } from "@/app/context/stateContext";
type Props = {};

function UserSamples({}: Props) {
  const { samplePage, setSamplePage } = useStateContext();
  return (
    <div className="bg-[#EEE8DA] h-max pb-[5vh]">
      {/* Main Heading */}
      <h1
        className={`px-[4%] py-[5vh] ${inter.className} text-3xl font-medium`}
      >
        Samples from this Seller
      </h1>
      {/* Sample Cards */}
      <div className="flex flex-row justify-between px-[4%] h-max ">
        {SampleServices.map((item, index) => (
          <SampleCard
            key={index}
            index={index}
            title={item.Title}
            category={item.Category}
            image={item.Image}
            rating={item.Rating}
            price={item.Price}
          />
        ))}
      </div>
      <p className={`flex flex-row ${inter.className} px-[4%] pt-[4vh]`}>
        <span className="text-4xl text-[#16A235] font-medium">
          0{samplePage}
        </span>
        <span className="font-medium text-black">/08</span>
        <div className="ml-[10%] mt-[1vh]">
          <ArrowLeft />
        </div>
        <div className="ml-[1%] mt-[1vh]">
          <ArrowRight />
        </div>
      </p>
    </div>
  );
}

export default UserSamples;
