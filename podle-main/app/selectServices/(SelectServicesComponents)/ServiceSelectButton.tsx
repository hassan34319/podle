"use client";
import { inter } from "@/app/utils/inter";
import React, { useState } from "react";

type Props = {
  text: string;
  toggleServiceSelection: (service: string) => void;
};

function ServiceSelectButton({ text, toggleServiceSelection }: Props) {
  const [selected, setSelected] = useState(false);
  const handleDivClick = () => {
    toggleServiceSelection(text);
    setSelected(!selected);
  };

  return (
    <div key={text} className="row-span-1 col-span-1 flex flex-row space-x-2  items-center justify-start">
      <div
        className={` w-7 h-7 rounded-lg mb-4 md:mb-0 ${
          selected ? "bg-[#16A235] border-white border-[3px] border-opacity-100" : "bg-white border-[#16A235] border-[0.5px]  border-opacity-50 "
        } `}
        onClick={handleDivClick}
      ></div>
      <p
        className={` ${inter.className} font-medium text-black whitespace-no-wrap`}
      >
        {text}
      </p>
    </div>
  );
}

export default ServiceSelectButton;
