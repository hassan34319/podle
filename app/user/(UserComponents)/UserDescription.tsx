import { inter } from "@/app/utils/inter";
import { renderRatingStars } from "@/app/utils/stars";
import React from "react";
import {MdOutlineVerifiedUser} from "react-icons/md"

type Props = {};

function UserDescription({}: Props) {
  return (
    <div
      className={`px-[8%] flex flex-col h-full justify-between ${inter.className} text-lg w-[64%] pb-[8vh]`}
    >
      {/* Name and other details */}
      <div className="flex flex-col w-full mt-[6vh]">
        {/* Name and Rating */}
        <div className="flex flex-row justify-between w-full">
          {/* Name */}
          <div>
            <p className="text-[#16A235] font-medium mb-[2vh]">Name</p>
            <p className="text-black font-semibold">Mix Podcast Studio</p>
          </div>
          {/* Rating */}
          <div>
            <p className="text-[#16A235] font-medium mb-[2vh]">Rating</p>
            <div className="flex flex-row space-x-2">
              {renderRatingStars(5).map((star, index) => (
                <span key={index}>{star}</span>
              ))}
              <p className="text-black text-sm font-semibold">(5.0)</p>
            </div>
          </div>
        </div>
        {/* Services and verified */}
        <div className="flex flex-row justify-between w-full mt-[8vh]">
          {/* Services */}
          <div>
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
      <div className="mb-[6vh]">
        <p className="text-[#16A235] font-medium mb-[2vh]">Description</p>
        <p className="text-black font-normal">
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit, sed qu. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          qu.
        </p>
      </div>
    </div>
  );
}

export default UserDescription;
