"use client";
import { client } from "@/app/utils/client";
import React, { useState } from "react";

type Props = {
  orderID: string;
};

function Delivery({ orderID }: Props) {
  const [delivered, setDelivered] = useState(false);
  const deliveryHandler = async (_id: string) => {
    try {
      // Fetch the document IDs that need to be updated
      await client.patch(_id).set({ status: "delivered" }).commit();
      console.log(`Order ${_id} status updated to 'delivered'`);

      console.log("All eligible orders have been updated to delivered");
      setDelivered(true);
    } catch (error) {
      console.error("Error updating orders:", error);
    }
  };
  return (
    <td className="px-6 py-2 md:py-4 whitespace-nowrap">
      {delivered ? (
        "Delivered"
      ) : (
        <button
          onClick={(e) => deliveryHandler(orderID)}
          className="bg-[#16A235] px-2 py-2"
        >Deliver Now</button>
      )}
    </td>
  );
}

export default Delivery;
