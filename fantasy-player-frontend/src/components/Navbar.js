import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <nav className='flex flex-row justify-center items-center bg-white rounded-full p-4 w-full px-10 max-w-[1200px] mx-auto'> 
        <Link to="/">
            <p className='flex items-center mr-4 px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-mediumt'>Home</p>
        </Link> 
        <Link to="/teams" className='flex items-center mr-4 px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-medium'>
            View Teams
        </Link>
        <Link to="/positions" className='flex items-center mr-4 px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-medium'>
            View Positions
        </Link>
    </nav>
  )
}

export default Navbar