import Image from 'next/image'
import Footer from './(UIComponents)/Footer'
import LandingHero from './(LandingComponents)/LandingHero'
import PodcastServices from './(LandingComponents)/PodcastServices'


export default function LandingPage() {
  return (
    <main className="top-0 mt-0 min-h-[100vh] text-black bg-[#E8DFCC]">
      <LandingHero/>
      <PodcastServices/>
      <Footer/>
    </main>
  )
}
