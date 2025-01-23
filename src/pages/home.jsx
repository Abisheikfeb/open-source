import React from 'react'
import { MdArrowBack } from "react-icons/md";
import { Link } from 'react-router-dom';

const home = () => {
  return (
    <div>
      <div>
        <Link to='/Navbar' className='flex'>
      <MdArrowBack className='text-3xl flex mt-2' />
      </Link>
      </div>

      <h1 className='text-yellow-300 text-5xl'>hellow</h1>
      
    </div>
  )
}

export default home