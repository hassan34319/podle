import React from 'react'
import { client } from '../utils/client'
import SignupContent from './(signupComponents)/SignupContent'
import Content from './(signupComponents)/SignupContent'
import SignupImage from './(signupComponents)/SignupImage'
import PodcastImage from './(signupComponents)/SignupImage'

type Props = {}

async function SignupPage({}: Props) {
  const signupImage = await client.fetch(`
  *[_type == "signupImage"] {
    ...
  }
`);
  return (
    <main className='min-h-[100vh] top-0 mt-0  text-black bg-[#E8DFCC]'>
        <div className='grid grid-cols-1 md:grid-cols-10'>
        <SignupContent/>
        <SignupImage  signUpImage={signupImage}/>
        </div>
    </main>
  )
}

export default SignupPage