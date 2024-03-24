import React from 'react'
import UserDescription from './UserDescription'
import UserImage from './UserImage'

type Props = {
  user : ServiceProvider
  rating : number;
  reviews : Review[]
  unclaimed : boolean;
}

function UserDetails({user,rating,reviews,unclaimed}: Props) {
  return (
    <div className='mt-[4vh] xl:h-[100vh] lg:h-[85vh] md:h-[60vh] h-max mb-[4vh] md:w-[90%] flex md:flex-row flex-col md:mx-[4%]'>
        <UserImage user={user} unclaimed={unclaimed}/>
        <UserDescription reviews={reviews} user={user} rating={rating} unclaimed={unclaimed}/>
    </div>
  )
}

export default UserDetails