import React from "react";
import { useStateContext } from "@/app/context/stateContext";

type Props = {
  num: number;
  paginate: (pageNumber: number) => void;
};

function PageCircle({ num, paginate }: Props) {
  const { selectedPage } = useStateContext();

  const toggleSelected = () => {
    paginate(num);
  };

  return (
    <div
      onClick={toggleSelected}
      className={`cursor-pointer flex items-center justify-center h-10 w-10 rounded-full ${
        selectedPage === num
          ? "bg-[#16A235] border-white border-[2px] text-white"
          : "bg-white border-[0.5px] border-[#16A235]"
      }`}
    >
      {num}
    </div>
  );
}

export default PageCircle;
