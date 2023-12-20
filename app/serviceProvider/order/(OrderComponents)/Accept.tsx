"use client";
import { client } from "@/app/utils/client";
import React, { useState } from "react";
interface Order {
  _id: string;
  buyerEmail: string;
  _createdAt: string;
  sellerEmail: string;
  price: number;
  estimatedDelivery: string;
  status: string;
  gigID: string;
  packageName: string;
  buyerName?: string;
  sellerName?: string;
  gigName?: string;
}
type Props = {
  order: Order;
};

function Accept({ order }: Props) {
  const [accepted, setAccept] = useState(false);
  const acceptHandler = async (_id: string) => {
    try {
      // Fetch the document IDs that need to be updated
      await client.patch(_id).set({ status: "accepted" }).commit();
      console.log(`Order ${_id} status updated to 'accepted'`);
      
      console.log("All eligible orders have been updated to delivered");

      const transData = {
        _type: 'transaction',
        buyerEmail: order.buyerEmail,
        sellerEmail: order.sellerEmail,
        amount: order.price * 0.9, // Replace with the actual amount
        status: 'Clearing', // Replace with the status
        gigID: order.gigID, // Replace with the gig ID
      };
      
      // Create the order document in Sanity
      await client.create(transData)
        .then((response) => {
          console.log('Order created successfully:', response);
        })
        .catch((error) => {
          console.error('Error creating order:', error);
        });
      setAccept(true);
    } catch (error) {
      console.error("Error updating orders:", error);
    }
  };
  return (
    <td className="px-6 py-2 md:py-4 whitespace-nowrap">
      {accepted ? (
        <button
        >
           <button
          // onClick={(e) => acceptHandler(order._id)}
          className="bg-[#16A235] px-2 py-2"
        >
          Give Review
        </button>
        </button>
      ) : (
        <button
          onClick={(e) => acceptHandler(order._id)}
          className="bg-[#16A235] px-2 py-2"
        >
          Accept Now
        </button>
      )}
    </td>
  );
}

export default Accept;
