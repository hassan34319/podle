import React from 'react'
import SignupContent from './(signupComponents)/SignupContent'
import Content from './(signupComponents)/SignupContent'
import SignupImage from './(signupComponents)/SignupImage'
import PodcastImage from './(signupComponents)/SignupImage'

type Props = {}

function SignupPage({}: Props) {
  return (
    <main className='min-h-[100vh] top-0 mt-0  text-black bg-[#E8DFCC]'>
        <div className='grid grid-cols-1 md:grid-cols-10'>
        <SignupContent/>
        <SignupImage/>
        </div>
    </main>
  )
}

export default SignupPage