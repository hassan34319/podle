"use client"
import { inter } from "@/app/utils/inter";
import React, { useState } from "react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
type Props = {};

function ServiceSearch({}: Props) {
  const [search, setSearch] = useState("");
  return (
    <div className="mt-[8vh] flex flex-row items-center justify-between px-10">
      {/* Search Input Keywords */}
      <div className="bg-white h-[7vh] w-[40%] border-black border-[0.5px] border-opacity-50 flex items-center justify-between px-2 rounded-lg">
        <input
          className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
          placeholder="Enter Keywords"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MagnifyingGlassIcon
          height={25}
          width={25}
          className="text-gray-900 mr-4 cursor-pointer"
          //   onClick={handleSearchSubmit}
        />
        {/* Categories Search */}
      </div>
      <div className="bg-white h-[7vh] w-[19%] border-black border-[0.5px] border-opacity-50 flex items-center  justify-between px-2 rounded-lg">
        <input
          className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
          placeholder="Search Category"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ChevronDownIcon
          height={25}
          width={25}
          className="text-gray-900 mr-4 cursor-pointer"
          //   onClick={handleSearchSubmit}
        />
      </div>
      {/* Location Search */}
      <div className="bg-white h-[7vh] w-[19%] border-black border-[0.5px] border-opacity-50 flex items-center  justify-between px-2 rounded-lg">
        <input
          className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
          placeholder="Search Location"
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ChevronDownIcon
          height={25}
          width={25}
          className="text-gray-900 mr-4 cursor-pointer"
          //   onClick={handleSearchSubmit}
        />
      </div>
      <button
        className={`bg-[#1F1E21] border-white h-[7vh] border-[1px] w-[13%] font-medium text-sm ${inter.className} text-white px-8 py-3 rounded-lg  text-center `}
        // onClick={handleSkipClick}
      >
        Search
      </button>
    </div>
  );
}

export default ServiceSearch;
