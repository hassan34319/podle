"use client";
import { useStateContext } from "@/app/context/stateContext";
import Link from "next/link";
import React, { useState } from "react";
import Navbar from "./Navbar";

type Props = {};

function Content({}: Props) {
  const {searchTitle, setSearchTitle} = useStateContext()


  return (
    <div className="col-span-1 mt-5  lg:mr-12 mr-3 lg:ml-0 ml-3">
      <Navbar />
      <div className="lg:mt-[10vh] mt-[2vh] 2xl:mt-[4vh] md:flex flex-col items-center block lg:block">
        <h1 className="font-extrabold lg:text-6xl ml-2 lg:mb-[6vh] mb-[3vh] 2xl:mb-[4vh] text-3xl">
          Welcome to Podle!
        </h1>
        {/* Main Content */}
        <div className="relative lg:text-3xl md:text-xl text-lg ml-2 text-black lg:text-left inline-block font-satoshi">
          <p className="m-0 font-medium">Unleash your podcast's potential! </p>
          <p className="m-0">
            <b className="font-extrabold">Discover</b>
            <span className="font-medium">{`, `}</span>
            <b className="font-extrabold">compare</b>
            <span className="font-medium">{`, and `}</span>
            <b className="font-extrabold">book</b>
            <span className="font-medium">
              {" "}
              top-notch services for production, hosting, editing and more.
            </span>
          </p>
          <p className="m-0 font-medium ">&nbsp;</p>
          <p className="m-0 font-medium">
            Leave reviews, make informed decisions, and amplify your podcasting
            game. Join our user-friendly platform and unlock success for your
            show.
          </p>
        </div>
        {/* Search Bar */}
        <div className="text-black text-opacity-50 flex flex-row items-center justify-between relative bg-white w-full h-12 mt-6 shadow-[1px_1px_3px_rgba(0,_0,_0,_0.25)]">
          <input
            type="text"
            placeholder="Search Podcasting Services"
            className="ml-6 font-normal w-full bg-transparent focus:outline-none"
            value={searchTitle}
            onChange={(e)=>setSearchTitle(e.target.value)}
          />
          <Link href="/services" className="cursor-pointer relative bg-black   text-white text-opacity-80 md:py-2 md:px-6 mr-1 px-2 py-1 rounded-sm md:rounded-none box-border items-center justify-center text-center ">
            <b className="relative text-center">Search</b>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Content;
