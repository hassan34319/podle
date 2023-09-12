import React from 'react'
import UserDescription from './UserDescription'
import UserImage from './UserImage'

type Props = {}

function UserDetails({}: Props) {
  return (
    <div className='mt-[4vh] lg:h-[85vh] md:h-[60vh] h-max mb-[4vh] md:w-[90%] flex md:flex-row flex-col md:mx-[4%]'>
        <UserImage/>
        <UserDescription/>
    </div>
  )
}

export default UserDetails