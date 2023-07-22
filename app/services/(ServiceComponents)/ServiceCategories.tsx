import React from 'react'
import Category from './Category'

type Props = {}

function ServiceCategories({}: Props) {
    return (
        <div className="mt-[3vh] flex flex-row items-center justify-between px-10 space-x-5">
          {/* Categoreis Mapped */}
          <Category text="Podcast Production Companies"/>
          <Category text="Podcast Studios"/>
          <Category text="Podcast Creation & Coaching"/>
          <Category text="Podcast Hosting"/>
          <Category text="Promotional Services"/>
        </div>
  )
}

export default ServiceCategories