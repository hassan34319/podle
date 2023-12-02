"use client"
import { ChevronDownIcon, ChevronUpIcon, PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

type Props = {
  policies: FAQ[];
};

type FAQ = {
    _id: string;
    question: string;
    answer: string;
  };

function FAQComponent({ policies }: Props) {
  const initialState: { [key: string]: boolean } = {};
  const [expanded, setExpanded] = useState(initialState);

  const toggleAnswer = (id: string) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="flex flex-col items-center mt-4 md:mt-8 lg:mt-16">
      <h1 className="text-lg md:text-xl lg:text-4xl font-bold">FAQ'S</h1>
      {policies.map((pol: FAQ) => {
        return (
          <div
            key={pol._id}
            className={`flex flex-col items-center mt-4 lg:mt-8 w-[90%] mx-auto text-center border-[1px] rounded-lg border-gray-500 px-1 py-2  md:px-2 md:py-4`}
          >
            <button
              onClick={() => toggleAnswer(pol._id)}
              className={`flex text-start items-center justify-between w-full cursor-pointer focus:outline-none  border-gray-500 px-2 py-4 ${expanded && expanded[pol._id] ? 'border-b-[1px]' : ''}`}
            >
              <h1 className="text-sm md:text-base lg:text-xl font-bold">
                {pol.question}
              </h1>
              {expanded && expanded[pol._id] ? (
                <MinusCircleIcon className="h-5 w-5" />
              ) : (
                <PlusCircleIcon className="h-5 w-5" />
              )}
            </button>
            {expanded && expanded[pol._id] && (
              <p className="text-xs md:text-sm lg:text-lg mt-2 lg:mt-4 text-start px-2 py-4">
                {pol.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FAQComponent;
