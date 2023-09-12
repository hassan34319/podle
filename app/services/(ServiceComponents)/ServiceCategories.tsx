import React from 'react'
import Category from './Category'

type Props = {}

function ServiceCategories({}: Props) {
    return (
        <div className="mt-[3vh] flex flex-wrap items-center lg:justify-between md:px-10 md:space-x-5 max-w-[100%] gap-x-2 gap-y-2 justify-center">
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