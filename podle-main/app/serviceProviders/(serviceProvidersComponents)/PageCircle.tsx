import React from "react";
import { useStateContext } from "@/app/context/stateContext";

type Props = {
  num: number;
  paginate: (pageNumber: number) => void;
  isActive: boolean;
  isAdjacent: boolean;
};

function PageCircle({ num, paginate, isActive, isAdjacent }: Props) {
  const { selectedPage } = useStateContext();

  const toggleSelected = () => {
    paginate(num);
  };

  return (
    <div
      onClick={toggleSelected}
      className={`cursor-pointer flex items-center justify-center h-10 w-10 rounded-full ${
        isActive
          ? "bg-[#16A235] border-white border-[2px] text-white"
          : isAdjacent
          ? "bg-white border-[0.5px] border-[#16A235]"
          : "hidden"
      }`}
    >
      {num}
    </div>
  );
}

export default PageCircle;