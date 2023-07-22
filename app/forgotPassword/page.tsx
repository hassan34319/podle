import React from 'react'
import PasswordContent from './(ForgotPasswordComponents)/PasswordContent'
import PasswordImage from './(ForgotPasswordComponents)/PasswordImage'

type Props = {}

function ForgotPasswordPage({}: Props) {
    return (
        <main className='min-h-[100vh] top-0 mt-0  text-black bg-[#E8DFCC]'>
            <div className='grid grid-cols-1 md:grid-cols-10'>
            <PasswordContent/>
            <PasswordImage/>
            </div>
        </main>
      )
    }

export default ForgotPasswordPage