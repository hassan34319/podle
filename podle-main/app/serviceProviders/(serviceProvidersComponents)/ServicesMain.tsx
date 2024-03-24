"use client"
import { useStateContext } from "@/app/context/stateContext";
import PageCircle from "./PageCircle";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import { useState } from "react";

type Props = {
  business: AutoBusiness[];
};

// Lazy load ServiceCard component
const ServiceCard = dynamic(() => import('./ServiceCard'));

function ServicesMain({ business }: Props) {
  const { specialTag } = useStateContext();
  const { searchName } = useStateContext();
  const { searchService } = useStateContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 40; // Number of items per page

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const filterDataset = (data: AutoBusiness[]) => {
    return data.filter((item) => {
      // Filtering logic based on multiple criteria
      const matchesTag = specialTag
        ? item.specialTag && item.specialTag.includes(specialTag) || specialTag == "All"
        : true;
      const matchesName = searchName
        ? item.name.toLowerCase().includes(searchName.toLowerCase())
        : true;
      const matchesService = searchService
      ? item.services && item.services.length > 0 && item.services.some(service => service.includes(searchService))
      : true;

      return matchesTag && matchesName && matchesService;
    });
  };

  // Assuming you have a dataset named Categorydataset
  const filteredData = filterDataset(business);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="h-full bg-[#EEE8DA] w-full mt-[5vh] pb-[5vh] ">
      {/* Grid for the services cards */}
      {!(searchName=="" && searchService=="" && specialTag=="") && <h1 className="pt-5 text-sm text-black text-opacity-50 mx-10">Your Search Returned {filteredData.length} / {business.length} Providers</h1>}
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-20 pt-10 mx-10">
        {currentItems.map((item, index) => (
          <ServiceCard
            rating={item.rating}
            key={index}
            _id={item._id}
            title={item.name}
            backgroundImage={item.logo}
            Category={item.specialTag}
            claimed={item.claimed}
            services={item.services}
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
  {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => {
    const page = i + 1;
    const isFirstPage = page === 1;
    const isLastPage = page === Math.ceil(filteredData.length / itemsPerPage);
    const isCurrentPage = page === currentPage;
    const isAdjacentPage = page === currentPage - 1 || page === currentPage + 1;

    return (
      <PageCircle
        key={i}
        num={page}
        paginate={paginate}
        isActive={isCurrentPage}
        isAdjacent={isAdjacentPage}
      />
    );
  })}
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
