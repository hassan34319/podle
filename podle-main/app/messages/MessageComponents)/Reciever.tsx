import Image from "next/image";
import React from "react";

type Props = {
    otherUserImage : string
    messageText : string
};

function Reciever({otherUserImage, messageText}: Props) {
  return (
    <div className="w-full flex flex-row gap-x-2">
      <div className="relative w-10 h-auto max-h-10 rounded-full items-center flex">
        <Image
          src={otherUserImage!}
          alt="Profile Icon"
          fill
          className="shadow rounded-full max-w-full h-auto align-middle border-none object-cover"
        />
      </div>
      <p className="text-sm md:text-base bg-white  rounded-r-2xl rounded-t-2xl px-6 flex items-center min-h-10 py-4 max-w-[50%]">
        {messageText}
      </p>
    </div>
  );
}

export default Reciever;
