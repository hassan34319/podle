"use client";
import LeaveReviewMain from "@/app/(UIComponents)/LeaveReviewMain";
import LoggedNavbar from "@/app/(UIComponents)/LoggedNavbar";
import order from "@/sanity/lib/order";
import React, { useState } from "react";
import Accept from "./Accept";
import Delivery from "./delivery";
import Rate from "./Rate";

type Props = {
  orders: Order[];
  ordersWithNames: Order[];
  ordersGivenWithNames: Order[];
};
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
function ServiceOrderMain({
  orders,
  ordersGivenWithNames,
  ordersWithNames,
}: Props) {
  const [review, setReview] = useState(false);
  const [gigId, setGigId] = useState("")
  const [orderId, setOrderId] = useState("")

  const handleReview = (gigId : string, orderId : string) => {
    setGigId(gigId)
    setOrderId(orderId)
    setReview(true)
  }
  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate: string = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }
  return (
    <main className="top-0 mt-0 min-h-[100vh] h-max text-black bg-[#E8DFCC]">
      <LoggedNavbar />
      {review && <LeaveReviewMain orderId={orderId} gigId={gigId} />}
      {!review && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <h1 className="text-3xl font-semibold mb-4">Orders Taken</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Buyer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Placed Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estimated Delivery
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gig Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders &&
                  ordersWithNames.map((order: Order, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                        {order.buyerName}
                      </td>
                      <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                        ${order.price}
                      </td>
                      <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                        {formatDate(order._createdAt)}
                      </td>
                      <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                        {order.estimatedDelivery}
                      </td>
                      <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                        {order.gigName}
                      </td>
                      <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                        {order.packageName}
                      </td>
                      {order.status === "Pending" && (
                        <Delivery orderID={order._id} />
                      )}
                      {order.status == "accepted" && (
                        <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                          Accepted
                        </td>
                      )}
                      {order.status == "reviewed" && (
                        <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                          Reviewed
                        </td>
                      )}
                      {order.status == "delivered" && (
                        <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                          Delivered
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <h1 className="text-3xl font-semibold mb-4 mt-4">Orders Placed</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Placed Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estimated Delivery
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gig Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders &&
                  ordersGivenWithNames.map((order: Order, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                        {order.sellerName}
                      </td>
                      <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                        ${order.price}
                      </td>
                      <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                        {formatDate(order._createdAt)}
                      </td>
                      <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                        {order.estimatedDelivery}
                      </td>
                      <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                        {order.gigName}
                      </td>
                      <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                        {order.packageName}
                      </td>
                      {order.status == "delivered" && (
                        <Accept order={order}  />
                      )}
                      {order.status == "accepted" && (
                        <button
                          //   onClick={(e) => acceptHandler(orderID)}
                          onClick={() => handleReview(order.gigID, order._id)}
                          className="bg-[#16A235] px-2 py-2"
                        >
                          Give Review
                        </button>
                      )}
                      {order.status != "delivered" &&
                        order.status != "accepted" && (
                          <td className="px-6 py-2 md:py-4 whitespace-nowrap">
                            {order.status}
                          </td>
                        )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}

export default ServiceOrderMain;
