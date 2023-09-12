import { inter } from "@/app/utils/inter";
import Image from "next/image";
import React from "react";

type Props = {};

function UserImage({}: Props) {
  return (
    <div className="flex flex-col md:w-[36%] w-[90%] relative mt-2 items-center mx-auto md:mx-0">
      {/* Image */}
      <div className="md:h-[80%] h-[24rem] w-full relative">
        <Image src="/card11.png" alt="User" className="object-cover rounded-lg" fill />
      </div>
      {/* Button */}
      <button
        className={`bg-[#16A235] mt-[3vh] hidden md:block border-white hover:bg-opacity-80 rounded-lg border-[0.5px] font-medium  ${inter.className} text-white w-full py-4 `}
        // onClick={() => router.push("/selectServices")}
      >
        Send Message
      </button>
    </div>
  );
}

export default UserImage;
