"use client"
 import React, { useState } from "react";
import PodcastCard from "./(PodcastServiceHelpers)/PodcastCard";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { inter } from "../utils/inter";

type Props = {};

function PodcastServices({}: Props) {
  const [showAllPodcasts, setShowAllPodcasts] = useState(false);

  const toggleViewAll = () => {
    setShowAllPodcasts((prevShowAllPodcasts) => !prevShowAllPodcasts);
  };

  return (
    <section className="bg-white bg-opacity-[27%] min-h-[100vh] md:pt-12 xl:pt-8 pb-10">
      <h1 className="text-center font-bold text-5xl">Podcast Services</h1>
      {/* Podcast Cards */}
      <div className="flex flex-col mt-20 space-y-14">
        <div
          className={`flex flex-row space-x-14 justify-center `}
        >
          <PodcastCard
            classname="w-[27%]"
            src="/card10"
            title="Video Production & Services"
          />
          <PodcastCard
            classname="w-[27%]"
            src="/card2"
            title="Promotion Tools"
          />
          <PodcastCard
            classname="w-[27%]"
            src="/card1"
            title="Audio Production"
          />
        </div>
        <div
          className={`flex-row space-x-14 mt-4 justify-center ${
            showAllPodcasts ? "flex" : "hidden"
          }`}
        >
          <PodcastCard
            classname="w-[27%]"
            src="/card11"
            title="Find Local Podcast Production Studios"
          />
          <PodcastCard
            classname="w-[27%]"
            src="/card5"
            title="Guest Bookings"
          />
          <PodcastCard
            classname="w-[27%]"
            src="/card6"
            title="Hosting Platforms"
          />
        </div>
        <div
          className={` flex-row justify-center space-x-14 mt-4 ${
            showAllPodcasts ? "flex" : "hidden"
          }`}
        >
          <PodcastCard
            classname="w-[27%]"
            src="/card7"
            title="Writing & Editing Software"
          />
          <PodcastCard
            classname="w-[27%]"
            src="/card8"
            title="Monetization Tools & Companies"
          />
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
