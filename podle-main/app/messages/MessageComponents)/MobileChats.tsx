"use client"

import Image from "next/image";
import React, { useState } from "react";
import CurrentConvo from "./CurrentConvo";

type Props = {
  conversations: Conversation[];
};

function MobileChats({ conversations }: Props) {
  const [mobileConv, setMobileConv] = useState<Conversation>();
  return (
    <section className="md:hidden flex-row px-5 xl:px-10 mt-4">
      {!mobileConv && (
        <div className="md:hidden md:w-[30%] w-full flex flex-col  overflow-y-auto min-h-[80vh] rounded-b-lg rounded-t-lg max-h-[80vh]  border-x-2 border-b-2 border-black border-opacity-30">
          <h1 className="py-4 w-full text-center rounded-t-lg md:text-xl text-lg font-bold text-white bg-[#16A235]">
            Messages
          </h1>

          {!mobileConv &&
            conversations.map((conversation, index) => (
              <div
                className="py-2 flex  cursor-pointer flex-row w-full gap-y-2 gap-x-4 px-4 border-b-[1px] border-opacity-30 border-black"
                key={index}
                onClick={() => setMobileConv(conversation)}
              >
                <div className="relative w-10 h-auto rounded-full items-center flex">
                  <Image
                    src={conversation.otherUserImage!}
                    alt="Profile Icon"
                    fill
                    className="shadow rounded-full max-w-full h-auto align-middle border-none object-cover"
                  />
                </div>
                <div className="flex-col  h-full w-[90%] items-center truncate">
                  <h1 className="text-bold md:text-lg font-bold">
                    {conversation.otherUserName}
                  </h1>
                  <p className="text-xs w-full truncate">
                    {conversation.messages[0].messageText}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
      {mobileConv && 
      <div>
    <h1 onClick={()=>setMobileConv(undefined)} className="text-black underline opacity-60  ">See All Messages</h1>
      <CurrentConvo conversation={mobileConv}/>
      </div>}
    </section>
  );
}

export default MobileChats;
