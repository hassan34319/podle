import React, { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { inter } from "@/app/utils/inter";
import { useStateContext } from "@/app/context/stateContext";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import BusinessFormAuto from "./BusinessFormAuto";
type Props = {
  claimAuto: boolean;
  claimManual: boolean;
  setClaimAuto: (value: boolean) => void;
  setClaimManual: (value: boolean) => void;
};

function ClaimBusinessAuto({ claimAuto, setClaimAuto, claimManual,setClaimManual }: Props) {
  const router = useRouter()
  const { business } = useStateContext();
  const [screen2, setScreen2] = useState(false)
  console.log(business);
  const handleSkipClick = () => {
    setClaimAuto(false)
  }



  return (
    <>
      {claimAuto && !claimManual && !screen2 && (
        <div className="flex flex-col items-center">
          <h1 className="lg:mt-[9vh] md:mt-[20vh] mt-[20vh]  font-extrabold md:text-6xl text-3xl flex flex-row ">
            Claim Your Business{" "}
            <InformationCircleIcon
              height={20}
              width={20}
              className="text-white mt-3 ml-2"
            />{" "}
          </h1>
          <div
            className={`mt-[8vh] rounded-lg bg-white box-border lg:w-[40%] md:w-[60%] w-[80%] border-[1px] ${inter.className} border-solid border-black flex items-center justify-center rounded-xl `}
          >
            <p className="text-black font-bold text-xl py-8 px-10 text-start">
              {business.searchResult}
            </p>
          </div>
          <div className="md:w-[40%] md:w-[60%] w-[80%] flex justify-between mt-[5vh]">
            <button
              className={`bg-[#1F1E21] border-[#969694] border-[1.5px] font-medium md:text-base text-sm  ${inter.className} text-white w-[45%] py-4 `}
              onClick={handleSkipClick}
            >
              SKIP FOR NOW
            </button>
            <button
              className={`bg-[#16A235] border-white  bg-opacity-80 border-[0.5px] font-medium md:text-base text-sm   ${inter.className} text-white w-[45%] py-2 `}
              onClick={()=>setScreen2(true)}
            >
              CLAIM NOW
            </button>
          </div>
        </div>
      )}
      {claimAuto && !claimManual && screen2 && (
        <BusinessFormAuto/>
      )}
    </>
  );
}

export default ClaimBusinessAuto;
