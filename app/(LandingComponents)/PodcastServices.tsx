"use client";
import React, { useState } from "react";
import PodcastCard from "./(PodcastServiceHelpers)/PodcastCard";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { inter } from "../utils/inter";
import { urlFor } from "../utils/UrlImage";

type Service = {
  title: string;
  image: {
    asset: {
      url: string;
    };
  };
};

type Props = {
  services: Service[]
};

function PodcastServices({ services }: Props) {
  const [showAllPodcasts, setShowAllPodcasts] = useState(false);

  const toggleViewAll = () => {
    setShowAllPodcasts((prevShowAllPodcasts) => !prevShowAllPodcasts);
  };

  return (
    <section className="bg-white bg-opacity-[27%] h-max lg:min-h-[100vh] pt-6 md:pt-12 xl:pt-8 pb-10">
      <h1 className="text-center  lg:text-5xl font-extrabold text-2xl">
        Podcast Services
      </h1>
      {/* Podcast Cards */}
      <div className="flex flex-col lg:mt-20 mt-6 space-y-14">
        <div
          className={`flex flex-wrap lg:w-full lg:gap-x-14 lg:justify-center justify-between w-[95%] mx-auto gap-y-4 lg:gap-y-14`}
        >
          {services.map((service : Service, index : number) => (
            <PodcastCard
              key={index}
              classname={`md:w-[27%] w-[48%] ${
                !showAllPodcasts && index > 1 ? "hidden" : ""
              } ${
                !showAllPodcasts && index ==2 ? "hidden md:block" : ""
              }`}
              src={urlFor(service.image).url()} // Use urlFor function here
              title={service.title}
            />
          ))} 
        </div>
      </div>
      <p
        className={`${inter.className} flex flex-row items-center justify-end font-medium mr-16 cursor-pointer hover:underline mt-10`}
        onClick={toggleViewAll}
      >
        {showAllPodcasts ? "View Less" : "View All"}{" "}
        {showAllPodcasts ? (
          <ChevronUpIcon className="ml-1 h-4 w-4" />
        ) : (
          <ChevronDownIcon className="ml-1 h-4 w-4" />
        )}
      </p>
    </section>
  );
}

export default PodcastServices;
