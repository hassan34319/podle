"use client"
import { useStateContext } from "@/app/context/stateContext";
import { inter } from "@/app/utils/inter";
import React, { useState } from "react";

type Props = {
    text : string
};

function Category({text}: Props) {
    const {selectedCategory, setSelectedCategory} = useStateContext()
    const toggleSelected = ()=> {
        setSelectedCategory(text)
    }
  return (
    <div onClick={toggleSelected} className={` h-[4vh]   py-4 cursor-pointer flex items-center justify-between px-4 rounded-lg ${inter.className} font-normal ${text === selectedCategory? 'bg-black text-white border-white border-[1px] border-opacity-100': 'border-black border-[0.5px] border-opacity-50 text-black bg-white'}`}>
      {text}
    </div>
  );
}

export default Category;
