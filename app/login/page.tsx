import React from 'react'
import { client } from '../utils/client';
import LoginContent from './(LoginComponents)/LoginContent'
import LoginImage from './(LoginComponents)/LoginImage'

type Props = {}


async function LoginPage({}: Props) {
  const loginImage = await client.fetch(`
  *[_type == "loginImage"] {
    ...
  }
`);
  return (
    <main className='min-h-[100vh] top-0 mt-0  text-black bg-[#E8DFCC]'>
        <div className='grid grid-cols-1 md:grid-cols-10'>
        <LoginContent/>
        <LoginImage LoginImage={loginImage}/>
        </div>
    </main>
  )
}

export default LoginPage