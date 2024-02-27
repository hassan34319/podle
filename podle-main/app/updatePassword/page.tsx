import React from 'react'
import { client } from '../utils/client';
import UpdateContent from './(UpdateComponents)/UpdateContent';
import UpdateImage from './(UpdateComponents)/UpdateImage';

type Props = {}


async function UpdatePage({}: Props) {
  const updateImage = await client.fetch(`
  *[_type == "updateImage"] {
    ...
  }
`);
  return (
    <main className='min-h-[100vh] top-0 mt-0  text-black bg-[#E8DFCC]'>
        <div className='grid grid-cols-1 md:grid-cols-10'>
        <UpdateContent/>
        <UpdateImage updateImage={updateImage}/>
        </div>
    </main>
  )
}

export default UpdatePage