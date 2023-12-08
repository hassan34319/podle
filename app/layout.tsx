import "./globals.css";
import type { Metadata } from "next";
import Head from "next/head";
import localFont from "next/font/local";
import { StateContext } from "./context/stateContext";
import Provider from "./context/client-provider";
import { getSessionServer } from "./utils/getCurrentUser";
import Script from "next/script";

const satoshi = localFont({
  src: [
    {
      path: "../public/Satoshi-Regular.woff2",
      weight: "400",
    },
    {
      path: "../public/Satoshi-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/Satoshi-Black.woff2",
      weight: "800",
    },
    {
      path: "../public/Satoshi-Medium.woff2",
      weight: "500",
    },
    {
      path: "../public/Satoshi-Light.woff2",
      weight: "200",
    },
    {
      path: "../public/Satoshi-Variable.woff2",
      weight: "100",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Podle",
  description: "Changing the podcast landscape",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionServer();
  return (
    <html lang="en">
      <body className={`${satoshi.className} top-0`}>
        <StateContext>
          <Provider session={session}>{children}</Provider>
        </StateContext>
      </body>
      <Script src="https://js.pusher.com/8.0.1/pusher.min.js"/>
    </html>
  );
}
