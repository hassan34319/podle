"use client";
import { useStateContext } from "@/app/context/stateContext";
import React from "react";

type Props = {};
type RightProps = {
  totalPages : number;
}

export default function ArrowLeft({}: Props) {
  const { selectedArrow, setSelectedArrow } = useStateContext();
  const {samplePage, setSamplePage} = useStateContext()
  const handleClickleft = () => {
    setSelectedArrow('left')
    if (samplePage !== 1) {
      setSamplePage(samplePage-1)
    }
  }
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClickleft}
      className="cursor-pointer"
    >
      <circle
        cx="31.5"
        cy="31.5"
        r="31.5"
        fill={`${selectedArrow === "left" ? "#16A235" : "#ffffff"}`}
        stroke = {`${selectedArrow === "right" ? "#16A235" : "#ffffff"}`}
      />
      <path
        d="M37 40.8321V19.8225C36.9993 19.6098 36.9389 19.4013 36.8252 19.2194C36.7116 19.0376 36.549 18.8893 36.355 18.7905C36.161 18.6917 35.9429 18.6461 35.7242 18.6587C35.5055 18.6713 35.2945 18.7415 35.1138 18.8619L19.486 29.3667C18.838 29.8021 18.838 30.8502 19.486 31.2868L35.1138 41.7916C35.2941 41.9132 35.5052 41.9845 35.7243 41.9977C35.9433 42.011 36.162 41.9657 36.3564 41.8668C36.5508 41.7679 36.7136 41.6192 36.8271 41.4368C36.9405 41.2544 37.0003 41.0452 37 40.8321Z"
        fill={`${selectedArrow === "left" ? "#ffffff" : "#16A235"}`}
      />
    </svg>
  );
}

export function ArrowRight({totalPages}: RightProps) {
  const { selectedArrow, setSelectedArrow } = useStateContext();
  const {samplePage, setSamplePage} = useStateContext()
  const handleClickright = () => {
    setSelectedArrow('right')
    if (samplePage !== totalPages) {
      setSamplePage(samplePage+1)
    }
  }
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
      onClick={handleClickright}
    >
      <circle
        cx="31.5"
        cy="31.5"
        r="30.5"
        fill={`${selectedArrow === "right" ? "#16A235" : "#ffffff"}`}
        stroke = {`${selectedArrow === "left" ? "#16A235" : "#ffffff"}`}
        stroke-width="2"
      />
      <path
        d="M25 20.1679L25 41.1775C25.0007 41.3902 25.0611 41.5987 25.1748 41.7806C25.2884 41.9624 25.451 42.1107 25.645 42.2095C25.839 42.3083 26.0571 42.3539 26.2758 42.3413C26.4945 42.3287 26.7055 42.2585 26.8862 42.1381L42.514 31.6333C43.162 31.1979 43.162 30.1498 42.514 29.7132L26.8862 19.2084C26.7059 19.0868 26.4948 19.0155 26.2757 19.0023C26.0567 18.989 25.838 19.0343 25.6436 19.1332C25.4492 19.2321 25.2864 19.3808 25.1729 19.5632C25.0595 19.7456 24.9997 19.9548 25 20.1679Z"
        fill={`${selectedArrow === "right" ? "#ffffff" : "#16A235"}`}
      />
    </svg>
  );
}
