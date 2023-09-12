"use client"
import React from "react";
import ServiceCard from "./ServiceCard";
import {Categorydataset} from "@/app/utils/Dataset"
import { useStateContext } from "@/app/context/stateContext";
import PageCircle from "./PageCircle";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid"
type Props = {};


function ServicesMain({}: Props) {
  const {selectedCategory} = useStateContext()
  const filterByCategory = (selectedCategory : string) => {
    return Categorydataset.filter((item) => item.category === selectedCategory);
  };
  const dataset = filterByCategory(selectedCategory)
  return (
    <section className="h-full bg-[#EEE8DA] w-full mt-[5vh] pb-[5vh] ">
      {/* Grid for the services cards */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-10 gap-y-10 pt-10 mx-10">
        {dataset.map((item, index) => (
          <ServiceCard
            key={index}
            rating={item.rating}
            title={item.title}
            backgroundImage={item.backgroundImage}
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
