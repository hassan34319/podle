import React from 'react'
import Content from './(LandingHeroHelpers)/Content'
import PodcastImage from './(LandingHeroHelpers)/PodcastImage'


type Image = {
  image: {
    asset: {
      url: string;
    };
  };
};

type Props = {
  homeImage: Image[]
};

function LandingHero({homeImage}: Props) {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 min-h-[100vh] lg:h-max lg:min-h-[50vh]  pb-20'>
        <PodcastImage homeImage={homeImage}/>
        <Content/>
    </section>
  )
}

export default LandingHero