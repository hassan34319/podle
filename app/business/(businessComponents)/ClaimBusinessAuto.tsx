import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { inter } from "@/app/utils/inter";
import { useStateContext } from "@/app/context/stateContext";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
type Props = {
  claimAuto: boolean;
  claimManual: boolean;
  setClaimAuto: (value: boolean) => void;
  setClaimManual: (value: boolean) => void;
};

function ClaimBusinessAuto({ claimAuto, setClaimAuto, claimManual,setClaimManual }: Props) {
  const router = useRouter()
  const { business } = useStateContext();
  console.log(business);
  const handleSkipClick = () => {
    setClaimAuto(false)
  }
  return (
    <>
      {claimAuto && !claimManual &&  (
        <div className="flex flex-col items-center">
          <h1 className="mt-[9vh] font-extrabold text-6xl flex flex-row ">
            Claim Your Business{" "}
            <InformationCircleIcon
              height={20}
              width={20}
              className="text-white mt-3 ml-2"
            />{" "}
          </h1>
          <div
            className={`mt-[8vh] rounded-lg bg-white box-border w-[40%] border-[1px] ${inter.className} border-solid border-black flex items-center justify-center rounded-xl `}
          >
            <p className="text-black font-bold text-xl py-8 px-10 text-start">
              {business.searchResult}
            </p>
          </div>
          <div className="w-[40%] flex justify-between mt-[5vh]">
            <button
              className={`bg-[#1F1E21] border-[#969694] border-[1.5px] font-medium  ${inter.className} text-white w-[45%] py-4 `}
              onClick={handleSkipClick}
            >
              SKIP FOR NOW
            </button>
            <button
              className={`bg-[#16A235] border-white  bg-opacity-80 border-[0.5px] font-medium  ${inter.className} text-white w-[45%] py-2 `}
              onClick={()=>router.push('/selectServices')}
            >
              CLAIM NOW
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ClaimBusinessAuto;
