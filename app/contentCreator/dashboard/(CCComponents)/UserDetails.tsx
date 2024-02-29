import React from 'react'
import { MdDetails } from 'react-icons/md'
import UserDescription from './UserDescription'
import UserImage from './UserImage'

type Props = {
  user : ContentCreator
}

function UserDetails({user}: Props) {
  console.log("From user Details",user)
  return (
    <div className='mt-[4vh] lg:h-[85vh] md:h-[60vh] h-max mb-[4vh] md:w-[90%] flex md:flex-row flex-col md:mx-[4%]'>
        <UserImage user={user} />
        <UserDescription  user={user} />
    </div>
  )
}

export default UserDetails