import { inter } from "@/app/utils/inter";
import { renderRatingStars } from "@/app/utils/stars";
import React from "react";
import {MdOutlineVerifiedUser} from "react-icons/md"

type Props = {};

function UserDescription({}: Props) {
  return (
    <div
      className={`px-[8%] flex flex-col h-full justify-between ${inter.className} text-lg md:w-[64%] w-full md:pb-[8vh] `}
    >
      {/* Name and other details */}
      <div className="flex flex-col w-full mt-[6vh]">
        {/* Name and Rating */}
        <div className="flex md:flex-row flex-col gap-y-2 md:gap-y-0 justify-between w-full">
          {/* Name */}
          <div className="w-full flex flex-row gap-x-4 md:block md:gap-x-0">
            <p className="text-[#16A235] font-medium mb-[2vh]">Name :</p>
            <p className="text-black font-semibold">Mix Podcast Studio</p>
          </div>
          {/* Rating */}
          <div className="w-full flex flex-row gap-x-4 md:block md:gap-x-0">
            <p className="text-[#16A235] font-medium mb-[2vh] ">Rating : </p>
            <div className="flex flex-row space-x-2">
              {renderRatingStars(5).map((star, index) => (
                <span key={index}>{star}</span>
              ))}
              <p className="text-black text-sm font-semibold">(5.0)</p>
            </div>
          </div>
        </div>
        {/* Services and verified */}
        <div className="flex md:flex-row flex-col gap-y-2 md:gap-y-0 justify-between w-full md:mt-[8vh]">
          {/* Services */}
          <div className="w-full flex flex-row gap-x-4 md:block md:gap-x-0">
            <p className="text-[#16A235] font-medium mb-[2vh]">Services</p>
            <p className="text-black font-semibold">Podcast Studio</p>
          </div>
          {/* Verified */}
          <div>
            <p className="text-[#16A235] font-medium mb-[2vh] flex flex-row">
              Verified Business
              <MdOutlineVerifiedUser height={6} width={6} className="text-black ml-2"/>
            </p>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="md:mb-[6vh] mb-[3vh]">
        <p className="text-[#16A235] font-medium mb-[2vh]">Description</p>
        <p className="text-black font-normal">
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit, sed qu. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          qu.
        </p>
      </div>
      <button
        className={`bg-[#16A235] mt-[3vh] md:hidden border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium  ${inter.className} text-white w-full py-4 `}
        // onClick={() => router.push("/selectServices")}
      >
        Send Message
      </button>
    </div>
  );
}

export default UserDescription;
