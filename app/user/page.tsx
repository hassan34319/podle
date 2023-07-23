import React from 'react'
import Footer from '../(UIComponents)/Footer'
import SecondaryNavbar from '../(UIComponents)/SecondaryNavbar'
import UserDetails from './(UserComponents)/UserDetails'
import UserReviews from './(UserComponents)/UserReviews'
import UserSamples from './(UserComponents)/UserSamples'

type Props = {}

function UserPage({}: Props) {
  return (
    <main className="top-0 mt-0 min-h-[100vh] text-black bg-[#E8DFCC]">
        <SecondaryNavbar/>
        <UserDetails/>
        <UserSamples/>
        <UserReviews/>
        <Footer/>
    </main>
  )
}

export default UserPage