import Footer from '@/app/(UIComponents)/Footer'
import LoggedNavbar from '@/app/(UIComponents)/LoggedNavbar'
import { client } from '@/app/utils/client'
import React from 'react'
import AddGigMain from './(AddGigComponents)/AddGigMain'

type Props = {}

async function addGigPage({}: Props) {
  const categories  = await client
  .fetch('*[_type == "podcastService"]')
  .then((document) => {
    if (document) {
      console.log("Document found:", document);
      return document;
    } else {
      console.log("Document not found");
    }
  })
  .catch((error) => {
    console.error("Error fetching document:", error);
  });
  return (
    <main className="top-0 mt-0 min-h-[100vh] text-black bg-[#E8DFCC]">
    <LoggedNavbar/>
    <AddGigMain categories={categories} />
    <Footer />
  </main>
  )
}

export default addGigPage