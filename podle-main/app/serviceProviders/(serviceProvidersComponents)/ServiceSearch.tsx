"use client";
import { inter } from "@/app/utils/inter";
import React, { useState } from "react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useStateContext } from "@/app/context/stateContext";
type Props = {
  categories: string[];
  business : AutoBusiness[]
};

function ServiceSearch({ categories, business }: Props) {
  const { specialTag, setSpecialTag } = useStateContext();
  const { searchName, setSearchName } = useStateContext();
  const { searchService, setSearchService } = useStateContext();
   console.log(specialTag,searchName,searchService)
  const [suggestedTitles, setSuggestedTitles] = useState<string[]>([]);

  const handlesearchNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const searchTerm = e.target.value.toLowerCase();
    setSearchName(e.target.value);

    if (searchTerm.length === 0) {
      setSuggestedTitles([]); // Clear suggestions if no input
      return;
    }

    // Filter Gigs based on entered title keyword
    const matchedTitles = business.filter((gig) =>
      gig.name.toLowerCase().includes(searchTerm)
    );

    // Extract matched titles to suggest
    const matchedTitlesList = matchedTitles.map((gig) => gig.name);
    setSuggestedTitles(matchedTitlesList);
  };

  const handleTitleSelect = (title: string) => {
    setSearchName(title);
    // Clear suggestions on title selection if needed
    setSuggestedTitles([]);
  };

  return (
    <div className="lg:mt-[8vh] mt-[4vh] flex flex-row flex-wrap items-center justify-between lg:px-10 px-4">
      {/* Search Input Keywords */}
      <div className="bg-white h-[7vh] md:w-[40%] w-[100%] text-xs md:text-base  border-black border-[0.5px] border-opacity-50 flex items-center justify-between px-2 rounded-lg">
        <div className="w-full">
          <input
            className={`${inter.className} w-full font-normal px-3 text-black focus:outline-none `}
            placeholder="Enter Keywords"
            required
            value={searchName}
            onChange={handlesearchNameChange}
          />
          {suggestedTitles.length > 0 && (
            <div className="absolute z-10 mt-4 bg-white w-[80%] xl:w-[40%] border-black border-[0.5px] border-opacity-50 rounded-b-lg shadow-lg">
              {suggestedTitles.map((title, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleTitleSelect(title)}
                >
                  {title}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Suggestions */}
        <MagnifyingGlassIcon
          height={25}
          width={25}
          className="text-gray-900 mr-4 cursor-pointer"
          //   onClick={handleSearchSubmit}
        />
        {/* Categories Search */}
      </div>
      <div className="bg-white mt-4 md:mt-0 h-[7vh] text-xs md:text-base md:w-[19%] w-[48%] border-black border-[0.5px] border-opacity-50 flex items-center justify-between px-2 rounded-lg">
        <select
          className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
          value={specialTag}
          onChange={(e) => setSpecialTag(e.target.value)}
        >
          <option value="">Tags</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Location Search */}
      <div className="bg-white h-[7vh] md:w-[19%] mt-4 md:mt-0 w-[48%] border-black border-[0.5px] border-opacity-50 flex items-center text-xs md:text-base  justify-between px-2 rounded-lg">
        <input
          className={`${inter.className} font-normal px-3 text-black focus:outline-none w-full`}
          placeholder="Search Services"
          required
          value={searchService}
          onChange={(e) => setSearchService(e.target.value)}
        />
      </div>
      <button
        className={`bg-[#1F1E21] border-white h-[7vh] mt-4 md:mt-0 border-[1px] md:w-[13%] w-[100%] font-medium text-sm ${inter.className} text-white px-8 py-3 rounded-lg  text-center `}
        // onClick={handleSkipClick}
      >
        Search
      </button>
    </div>
  );
}

export default ServiceSearch;
