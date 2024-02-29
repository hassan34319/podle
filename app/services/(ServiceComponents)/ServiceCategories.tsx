import React from 'react'
import Category from './Category'

type Props = {
  categories : Category[]
}

function ServiceCategories({categories}: Props) {
    return (
        <div className="mt-[3vh] flex flex-wrap items-center xl:justify-center xl:gap-y-4 md:px-10 md:space-x-5 max-w-[100%] gap-x-2 gap-y-2 justify-center">
          {/* Categoreis Mapped */}
          <Category text={"All"}/>
          {categories.map((category)=> {
            return (
              <Category text={category.title}/>
            )
          })}

        </div>
  )
}

export default ServiceCategories