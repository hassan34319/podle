import React from 'react'
import UserDescription from './UserDescription'
import UserImage from './UserImage'

type Props = {}

function UserDetails({}: Props) {
  return (
    <div className='mt-[4vh] h-[85vh] mb-[4vh] w-[90%] flex flex-row mx-[4%]'>
        <UserImage/>
        <UserDescription/>
    </div>
  )
}

export default UserDetails