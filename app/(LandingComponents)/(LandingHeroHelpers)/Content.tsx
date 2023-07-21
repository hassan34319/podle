"use client";
import React, { useState } from "react";
import Navbar from "./Navbar";

type Props = {};

function Content({}: Props) {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    // Implement the logic for handling the search submission here
    console.log("Search submitted:", searchInput);
  };

  return (
    <div className="col-span-1 mt-5 flex-col md:mr-12 mr-3 md:ml-0 ml-3">
      <Navbar />
      <div className="mt-[10vh] 2xl:mt-[4vh]">
        <h1 className="font-extrabold text-6xl ml-2 mb-[6vh] 2xl:mb-[4vh]">
          Welcome to Podle!
        </h1>
        {/* Main Content */}
        <div className="relative text-3xl ml-2 text-black text-left inline-block font-satoshi">
          <p className="m-0 font-medium">Unleash your podcast's potential! </p>
          <p className="m-0">
            <b className="">Discover</b>
            <span className="font-medium">{`, `}</span>
            <b className="">compare</b>
            <span className="font-medium">{`, and `}</span>
            <b className="font-satoshi">book</b>
            <span className="font-medium">
              {" "}
              top-notch services for production, hosting, editing and more.
            </span>
          </p>
          <p className="m-0 font-medium hidden xl:block">&nbsp;</p>
          <p className="m-0 font-medium hidden xl:block">
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
            value={searchInput}
            onChange={handleInputChange}
          />
          <div onClick={handleSearchSubmit} className="cursor-pointer relative bg-black   text-white text-opacity-80 md:py-2 md:px-6 mr-1 px-2 py-1 rounded-sm md:rounded-none box-border items-center justify-center text-center ">
            <b className="relative text-center">Search</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
