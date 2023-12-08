"use client";
import React, { useState } from "react";
import ServiceCard from "./ServiceCard";
import { Categorydataset } from "@/app/utils/Dataset";
import { useStateContext } from "@/app/context/stateContext";
import PageCircle from "./PageCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
type Props = {
  Gigs: Gig[];
};

function ServicesMain({ Gigs }: Props) {
  const { selectedCategory } = useStateContext();
  const { searchTitle } = useStateContext();
  const { searchLocation } = useStateContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items per page

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const filterDataset = (data: Gig[]) => {
    return data.filter((item) => {
      // Filtering logic based on multiple criteria
      const matchesCategory = selectedCategory
        ? item.category.includes(selectedCategory) || selectedCategory == "All"
        : true;
      const matchesTitle = searchTitle
        ? item.title.toLowerCase().includes(searchTitle.toLowerCase())
        : true;
      const matchesLocation = searchLocation
        ? item.location.includes(searchLocation)
        : true;

      return matchesCategory && matchesTitle && matchesLocation;
    });
  };

  // Assuming you have a dataset named Categorydataset
  const filteredData = filterDataset(Gigs);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <section className="h-full bg-[#EEE8DA] w-full mt-[5vh] pb-[5vh] ">
      {/* Grid for the services cards */}
      {selectedCategory != "All" && selectedCategory!=""  && <h1 className="mt-5 text-sm text-black text-opacity-50 mx-10">Your Search Returned {filteredData.length} / {Gigs.length} Results</h1>}
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-10 pt-10 mx-10">
        {filteredData.map((item, index) => (
          <ServiceCard
            key={index}
            _id={item._id}
            rating={item.rating}
            title={item.title}
            backgroundImage={item.imageUrl}
            Category={item.category}
          />
        ))}
      </div>
      {filterDataset.length == 0 && <div className="text-center pt-10 text-black ">No Results Found</div>}
      <div className="mt-[20vh] flex items-center justify-center space-x-4">
        <ChevronLeftIcon
          height={20}
          width={20}
          className={`text-[#16A235] cursor-pointer ${
            currentPage === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
        />
        {/* Display page circles based on the number of pages */}
        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
          <PageCircle key={i} num={i + 1} paginate={paginate} />
        ))}
        <ChevronRightIcon
          height={20}
          width={20}
          className={`text-[#16A235] cursor-pointer ${
            indexOfLastItem >= filteredData.length ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </div>
    </section>
  );
}

export default ServicesMain;
