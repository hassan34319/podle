import Image from 'next/image'
import Footer from './(UIComponents)/Footer'
import LandingHero from './(LandingComponents)/LandingHero'
import PodcastServices from './(LandingComponents)/PodcastServices'
import { client } from './utils/client';
import { getServerSession } from "next-auth/next"
import type { NextRequest } from "next/server"
import { authOptions } from './utils/auth';
import { getSessionServer } from './utils/getCurrentUser';


export const revalidate = 60
export default async function LandingPage() {
  const session = await getSessionServer()
  console.log("From home session", session)
  const services = await client.fetch(`
  *[_type == "podcastService"] {
    ...
  }
`);
  const homeImage = await client.fetch(`
  *[_type == "homeImage"] {
    ...
  }
`);

console.log(homeImage)

  return (
    <main className="top-0 mt-0 min-h-[100vh] text-black bg-[#E8DFCC]">
      <LandingHero homeImage={homeImage}/>
      <PodcastServices services={services}/>
      <Footer/>
    </main>
  )
}
