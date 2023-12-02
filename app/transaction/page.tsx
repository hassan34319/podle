import Link from "next/link";
import React from "react";
import Footer from "../(UIComponents)/Footer";
import LoggedNavbar from "../(UIComponents)/LoggedNavbar";
import { client } from "../utils/client";
import { getSessionServer } from "../utils/getCurrentUser";
interface Transaction {
  _createdAt: string;
  buyerEmail: string;
  sellerEmail: string;
  amount: number;
  status: string;
  gigID: string;
  gigName?: string; // This field will be filled later when fetching details
  buyerUsername?: string; // This field will be filled later when fetching details
}

type Props = {};

async function page({}: Props) {
  const session = await getSessionServer();

  if (!session || !session.user || session.user.name != "serviceProvider") {
    return <div>Transactions are only for service providers</div>;
  }
  const sellerEmail = session?.user?.email;

  const transactions = await client
    .fetch('*[_type == "transaction" && sellerEmail == $email]', {
      email: sellerEmail,
    })
    .catch((error) => {
      console.error("Error fetching buyer details:", error);
    });

  const transactionsWithDetails = await Promise.all(
    transactions &&
      transactions.map(async (transaction: Transaction) => {
        // Fetch gig information using gigId
        const gigInfo = await client
          .fetch('*[_type == "gig" && _id == $gigId][0]', {
            gigId: transaction.gigID,
          })
          .catch((error) => {
            console.error("Error fetching gig details:", error);
            return {};
          });

        // Fetch buyer information using buyerEmail
        const buyerInfo = await client
          .fetch('*[_type == "contentCreator" && email == $email][0]', {
            email: transaction.buyerEmail,
          })
          .catch((error) => {
            console.error("Error fetching buyer details:", error);
            return {};
          });

        if (buyerInfo) {
          return {
            ...transaction,
            gigName: gigInfo.title || "Unknown Gig", // Assuming 'name' field exists in 'gig' type
            buyerUsername: buyerInfo.userName || "Unknown Username", // Assuming 'username' field exists in 'buyer' type
          };
        } else {
          const buyerInfo2 = await client
            .fetch('*[_type == "claimedBusiness" && email == $email][0]', {
              email: transaction.buyerEmail,
            })
            .catch((error) => {
              console.error("Error fetching buyer details:", error);
              return {};
            });

          return {
            ...transaction,
            gigName: gigInfo.title || "Unknown Gig", // Assuming 'name' field exists in 'gig' type
            buyerUsername: buyerInfo2.name || "Unknown Username", // Assuming 'username' field exists in 'buyer' type
          };
        }
      })
  );

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

  console.log("Transactions with Details:", transactionsWithDetails);

  const sumClearing: number = transactions
    .filter((transaction: Transaction) => transaction.status === "Clearing")
    .reduce(
      (sum: number, transaction: Transaction) => sum + transaction.amount,
      0
    );

  // 2) Sum of transactions amount with status 'Withdrawn'
  const sumWithdrawn: number = transactions
    .filter((transaction: Transaction) => transaction.status === "Withdrawn")
    .reduce(
      (sum: number, transaction: Transaction) => sum + transaction.amount,
      0
    );

  // 3) Sum of transactions amount with status 'Available'
  const sumAvailable: number = transactions
    .filter((transaction: Transaction) => transaction.status === "Available")
    .reduce(
      (sum: number, transaction: Transaction) => sum + transaction.amount,
      0
    );

  // 4) Sum of transactions amount with status 'Available' and current month
  const currentDate: Date = new Date();
  const currentMonth: number = currentDate.getMonth() + 1; // January is 0 in JavaScript
  const sumAvailableCurrentMonth: number = transactions
    .filter((transaction: Transaction) => {
      const transactionDate: Date = new Date(transaction._createdAt); // Assuming 'date' is the transaction date
      return (
        transaction.status === "Available" &&
        transactionDate.getMonth() + 1 === currentMonth
      );
    })
    .reduce(
      (sum: number, transaction: Transaction) => sum + transaction.amount,
      0
    );

  // 5) Count of transactions with status 'Clearing'
  const countClearing: number = transactions.filter(
    (transaction: Transaction) => transaction.status === "Clearing"
  ).length;
  const countClearingToday : number = transactions.filter(
    (transaction: Transaction) => transaction.status === "Clearing" && transaction._createdAt   == String(currentDate.getDate() - 9)
  ).length;

  // 6) Sum of transactions with both 'Available' and 'Clearing' status
  const sumAvailableAndWithdrawn: number = transactions
    .filter(
      (transaction: Transaction) =>
        transaction.status === "Available" || transaction.status === "Withdrawn"
    )
    .reduce(
      (sum: number, transaction: Transaction) => sum + transaction.amount,
      0
    );

  return (
    <main className="top-0 mt-0 min-h-[100vh] text-black bg-[#E8DFCC]">
      <LoggedNavbar />
      <section className="px-5 md:px-10 mt-4 md:mt-8">
        <h1 className="font-bold text-xl md:text-3xl ">Payments</h1>
        <div className="grid grid-rows-1 grid-cols-1 xl:grid-cols-3 bg-[#EEE8DA] w-full rounded-lg mt-2 md:mt-4">
          <div className="flex-col col-span-1 py-5 px-2 md:px-4">
            <h1 className="md:text-lg mb-2 md:mb-4 font-bold">
              Available Funds
            </h1>
            <div className="border-black border-2 border-opacity-40 py-5 px-2 md:px-4 rounded-lg">
              <h1 className="mt-1 font-bold">Balance available for use</h1>
              <h1 className="mt-2 md:mt-4 font-bold text-lg md:text-2xl">
                ${sumAvailable}
              </h1>
              <h1 className="mt-2 md:mt-4 text-xs md:text-sm">
                Withdrawn to Date :{" "}
              </h1>
              <h1 className="mt-1 text-xs md:text-sm">${sumWithdrawn}</h1>
              <button className="mt-5 md:mt-10 text-sm md:text-base bg-black px-4 py-2 text-white">
                Withdraw Balance
              </button>
            </div>
          </div>
          <div className="flex-col col-span-1 py-5 px-2 md:px-4">
            <h1 className="md:text-lg mb-2 md:mb-4 font-bold">
              Future Payments
            </h1>
            <div className="border-black border-2 border-opacity-40 py-5 px-2 md:px-4 rounded-lg">
              <h1 className="mt-1 font-bold">Payments being cleared</h1>
              <h1 className="mt-2 md:mt-4 font-bold text-lg md:text-2xl">
                ${sumClearing}
              </h1>
              <h1 className="mt-2 md:mt-4 text-xs md:text-sm">
                Total Payments : {countClearing}
              </h1>
              <h1 className="mt-1 text-xs md:text-sm">
                Payments Clearing Today : {countClearingToday}
              </h1>
              <Link href="/serviceProvider/orders">
                <button className="cursor-pointer mt-5 md:mt-10 bg-black text-sm md:text-base px-4 py-2 text-white w-max">
                  {" "}
                  View Orders
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-col col-span-1 py-5 px-2 md:px-4">
            <h1 className="md:text-lg mb-2 md:mb-4 font-bold">Earnings</h1>
            <div className="border-black border-2 border-opacity-40 py-5 px-2 md:px-4 rounded-lg">
              <h1 className="mt-1 font-bold">Earned this month</h1>
              <h1 className="mt-2 md:mt-4 font-bold text-lg md:text-2xl">
                ${sumAvailableCurrentMonth}
              </h1>
              <h1 className="mt-1 text-xs md:text-sm border-b-2 py-2 border-black border-opacity-30">
                Your Earning this month
              </h1>
              <h1 className="mt-2 font-bold">Earned since joining</h1>
              <h1 className="mt-2 md:mt-4 font-bold text-lg md:text-2xl">
                ${sumAvailableAndWithdrawn}
              </h1>
              <h1 className="mt-1 text-xs md:text-sm  border-black border-opacity-30">
                Your Earning since joining Podle.
              </h1>
            </div>
          </div>
        </div>
        <section>
          <h1 className="font-bold text-xl mt-4 md:mt-8 md:text-3xl ">
            Transactions
          </h1>
          <div className="flex flex-col px-5 md:px-10 bg-[#EEE8DA] w-full rounded-lg mt-2 md:mt-4 overflow-x-auto">
            {transactionsWithDetails.map(
              (transaction: Transaction, index: number) => (
                <div
                  key={index}
                  className="flex flex-row text-sm md:text-base gap-x-8 md:justify-between py-4 border-b-2 border-black border-opacity-20"
                >
                  {/* Render individual transaction details */}
                  <p>{formatDate(transaction._createdAt)}</p>
                  <p>{transaction.status}</p>
                  <p>{`@${transaction.buyerUsername}`}</p>
                  <p>{transaction.gigName}</p>
                  <p>{`$${transaction.amount}`}</p>
                </div>
              )
            )}
          </div>
        </section>
      </section>
      <Footer />
      {/* <PodcastServices />
  <Footer /> */}
    </main>
  );
}

export default page;
