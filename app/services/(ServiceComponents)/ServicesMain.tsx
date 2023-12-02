"use client"
import React from "react";
import ServiceCard from "./ServiceCard";
import {Categorydataset} from "@/app/utils/Dataset"
import { useStateContext } from "@/app/context/stateContext";
import PageCircle from "./PageCircle";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid"
type Props = {
  Gigs : Gig[]
};


function ServicesMain({Gigs}: Props) {
  const {selectedCategory} = useStateContext()
  const {searchTitle} = useStateContext()
  const {searchLocation} = useStateContext()
  const filterDataset = (data : Gig[]) => {
    return data.filter((item) => {
      // Filtering logic based on multiple criteria
      const matchesCategory = selectedCategory ? item.category.includes(selectedCategory) : true;
      const matchesTitle = searchTitle ? item.title.toLowerCase().includes(searchTitle.toLowerCase()) : true;
      const matchesLocation = searchLocation ? item.location.includes(searchLocation) : true;
  
      return matchesCategory && matchesTitle && matchesLocation;
    });
  };
  
  // Assuming you have a dataset named Categorydataset
  const filteredData = filterDataset(Gigs);
  
  return (
    <section className="h-full bg-[#EEE8DA] w-full mt-[5vh] pb-[5vh] ">
      {/* Grid for the services cards */}
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
      <div className="mt-[8vh] flex items-center justify-center space-x-4">
        <ChevronLeftIcon height={20} width={20} className="text-[#16A235]"/>
        <PageCircle num={1}/>
        <PageCircle num={2}/>
        <PageCircle num={3}/>
        <PageCircle num={4}/>
        <ChevronRightIcon height={20} width={20} className="text-[#16A235] "/>
      </div>
    </section>
  );
}

export default ServicesMain;
