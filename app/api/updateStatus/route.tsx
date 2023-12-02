import { client } from "@/app/utils/client";
import cron from 'node-cron';
import { NextResponse } from "next/server";

const updateTransactionStatus = async () => {
    try {
      // Fetch transactions created 10 days ago
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
  
      const query = `*[_type == 'transaction' && _createdAt < $tenDaysAgo]`;
      const transactions = await client.fetch(query, { tenDaysAgo });
  
      // Update the status of each transaction to 'Available'
      if (transactions.length > 0) {
        for (const transaction of transactions) {
          await client
            .patch(transaction._id)
            .set({ status: 'Available' })
            .commit();
        }
        console.log('Transaction statuses updated:', transactions.length);
      } else {
        console.log('No transactions found.');
      }
    } catch (error) {
      console.error('Error updating transaction statuses:', error);
    }
  };

  export async function GET(req: Request) {
    try {
        const response = await updateTransactionStatus()
        NextResponse.json("Success")
    } catch (error) {
        NextResponse.json("Error")
      }
    }

    cron.schedule('0 0 * * *', async () => {
          const response = await fetch('http://localhost:3000/api/updateStatus')
      });