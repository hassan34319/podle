import { client } from "@/app/utils/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Pusher from 'pusher-js';
import CurrentUser from "./CurrentUser";
import Attach from "./Icon";
import Reciever from "./Reciever";
import Send from "./Send";
import { user } from "next-auth-sanity/schemas";

type Props = {
  conversation: Conversation;
};

type Message = {
  messageText : string;
  sender : string
}

function CurrentConvo({ conversation }: Props) {
  const session = useSession();
  const senderEmail = session.data?.user?.email;
  const [newMessage, setNewMessage] = useState("");
  const [chats, setChats] = useState<{ [key: string]: Message[] }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };



  useEffect(() => {
    const pusher = new Pusher('b1a1683f5717cd28b393', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('chat' + conversation._id);

    channel.bind('chat-event', function (data: Message) {
      if(!data.messageText) {
        return
      }
      setChats((prevChats) => ({
        ...prevChats,
        [conversation._id]: [
          ...(prevChats[conversation._id] || []),
          { sender: data.sender, messageText: data.messageText }
        ]
      }));
    });

    return () => {
      pusher.unsubscribe('chat' + conversation._id);
    };
  }, [conversation._id]);

  

  const sendMessage = async () => {
    const updatedConversation = {
      ...conversation,
      messages: [
        ...(conversation.messages || []),
        {
          messageText: newMessage,
          sender: senderEmail
        }
      ]
    };

    try {
      if(!newMessage) {
        return;
      }
      // Update local state
      setChats((prevChats) => ({
        ...prevChats,
        [conversation._id]: [
          ...(prevChats[conversation._id] || conversation.messages || []),
          { sender: senderEmail || '', messageText: newMessage },
        ],
      }));

      await fetch('/api/pusherMain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          conversationId: conversation._id,
          message: newMessage,
          sender: senderEmail // Replace with actual sender email
        })
      });

      await client
      .patch(conversation._id)
      .set({ messages: updatedConversation.messages })
      .commit();
      // Send message via Pusher
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Retrieve messages for the current conversation
  const currentMessages = chats[conversation._id] || conversation.messages || [];

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);
  return (
    <div className="px-4  h-max border-2 border-black rounded-lg border-opacity-30 xl:mx-10 mt-4 md:mt-0 w-full py-2">
      <div className="h-16 gap-x-2 md:gap-x-4 py-2 border-b-[1px] border-black border-opacity-90 px-4 flex flex-row">
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
            {conversation.otherUserType}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 justify-end mb-0">
        <div className="flex flex-col gap-y-4 justify-end min-h-[60vh] mb-0">
          <div className="overflow-y-auto no-scrollbar max-h-[60vh] gap-y-4 flex flex-col py-2 px-4">
            {currentMessages.map((message, index) =>
              message.sender === senderEmail ? (
                <CurrentUser messageText={message.messageText} key={index} />
              ) : (
                <Reciever
                  messageText={message.messageText}
                  key={index}
                  otherUserImage={conversation.otherUserImage!}
                />
              )
            )}
            <div ref={messagesEndRef}></div>
          </div>
        </div>
        <div className="flex flex-row mt-4 mb-2  w-full">
          <Attach />
          <input
            placeholder="Send Message"
            className="text-sm rounded-2xl bg-white text-black px-2 w-full"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          ></input>
          <Send handleSubmit={sendMessage}/>
        </div>
      </div>
    </div>
  );
}

export default CurrentConvo;
