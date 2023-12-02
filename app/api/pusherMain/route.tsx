

// const pusher = new Pusher({
//   appId: "1716632",
//   key: "b1a1683f5717cd28b393",
//   secret: "720553e7e8b7263abb2f",
//   cluster: "mt1",
//   useTLS: true
// });

import { NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1716632",
  key: "b1a1683f5717cd28b393",
  secret: "720553e7e8b7263abb2f",
  cluster: "mt1",
  useTLS: true
});
// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });
export async function POST(
    request: Request
) {
    const body = await request.json();
    const { conversationId, message, sender } = body;
    console.log(conversationId,message,sender)



    try {
            const response = await pusher.trigger('chat'+ conversationId, 'chat-event', {
                conversationId,
                message,
                sender
              });

            console.log(response)
      return NextResponse.json(response);
    } catch (err) {
      console.log(err)
      const errorMessage = err instanceof Error ? err.message : "Internal server error";
      return NextResponse.json({ statusCode: 500, message: errorMessage });
    }
  } 