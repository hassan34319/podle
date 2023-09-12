import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import BusinessImage from "./(businessComponents)/BusinessImage";
import BusinessForm from "./(businessComponents)/BusinessForm";
import { inter } from "../utils/inter";

type Props = {
  claimAuto: boolean;
  claimManual: boolean;
  setClaimManual: (value: boolean) => void;
  setClaimAuto: (value: boolean) => void;
};

function ClaimBusinessManual({
  claimAuto,
  claimManual,
  setClaimManual,
  setClaimAuto,
}: Props) {
  const handleBackClick = () => {
    setClaimManual(false);
  };
  return (
    <>
      {!claimAuto && claimManual && (
        <>
          <div className="flex flex-col items-center">
 <h1 className="lg:mt-[-5vh] md:mt-[5vh] mt-[4vh]  font-extrabold md:text-6xl text-3xl flex flex-row ">
            Claim Your Business{" "}
            <InformationCircleIcon
              height={20}
              width={20}
              className="text-white mt-3 ml-2"
            />{" "}
          </h1>
            <div className=" pb-4 md:h-[75vh] h-max lg:w-[85%] md:w-[90%] w-[95%] bg-[#E8DFCC] rounded-xl mt-[5vh] grid md:grid-cols-2 grid-cols-1 pt-10 md:pt-0">
              <BusinessImage />
              <BusinessForm />
            </div>
          </div>
          <button
            className={`font-medium text-sm ${inter.className} pl-[8%] pt-[1vh] text-white underline  `}
            onClick={handleBackClick}
          >
            Back
          </button>
        </>
      )}
    </>
  );
}

export default ClaimBusinessManual;
