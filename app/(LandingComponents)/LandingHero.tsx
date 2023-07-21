import React from 'react'
import Content from './(LandingHeroHelpers)/Content'
import PodcastImage from './(LandingHeroHelpers)/PodcastImage'


type Props = {}

function LandingHero({}: Props) {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 min-h-[100vh] pb-20'>
        <PodcastImage/>
        <Content/>
    </section>
  )
}

export default LandingHero