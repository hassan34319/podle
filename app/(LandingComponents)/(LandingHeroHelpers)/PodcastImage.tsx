import Image from 'next/image'
import React from 'react'

type Props = {}

function PodcastImage({}: Props) {
  return (
    <div className='col-span-1 mt-4 md:ml-3 md:mr-28'>
        <div className='relative h-[60rem] max-h-[95vh]'>
            <Image src='/mainPageGirl.png' alt='Podcast Girl' className='object-cover' fill />
        </div>
    </div>
  )
}

export default PodcastImage