"use client"
import React, { useState } from "react";
import CurrentConvo from "./CurrentConvo";
import Users from "./Users";


type Props = {
    conversations : Conversation[]
};

function MainConvo({conversations}: Props) {
    const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0])
  return (
    <section className="hidden md:flex flex-row px-5 xl:px-10 mt-4">
      {/* Users */}
      <Users conversations={conversations} setSelectedConversation={setSelectedConversation} />
      <CurrentConvo conversation={selectedConversation}/>
    </section>
  );
}

export default MainConvo;
