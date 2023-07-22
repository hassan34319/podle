import React from 'react'
import LoginContent from './(LoginComponents)/LoginContent'
import LoginImage from './(LoginComponents)/LoginImage'

type Props = {}


function LoginPage({}: Props) {
  return (
    <main className='min-h-[100vh] top-0 mt-0  text-black bg-[#E8DFCC]'>
        <div className='grid grid-cols-1 md:grid-cols-10'>
        <LoginContent/>
        <LoginImage/>
        </div>
    </main>
  )
}

export default LoginPage