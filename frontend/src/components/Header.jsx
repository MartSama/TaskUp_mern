import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <header className='px-4 py-5 bg-gray-400 border-b border-b-violet-600'>
            <div className='md:flex md:justify-between '>
                <h2 className='text-4xl text-violet-600 font-black text-center '>UpTask</h2>
                <input type="search" placeholder='Look for project 🔍' className='rounded-xl px-2 text-violet-600 border border-violet-600 block mx-auto mt-5 md:mt-0 py-4 w-2/3 md:w-2/4' />
                <div className='flex items-center gap-4 justify-center mt-5 md:mt-0'>
                    <Link to='projects' className='font-bold uppercase'>Projects</Link>
                    <button type="button" className='ml-2 py-2 px-4 bg-violet-300 rounded-md'>Log out</button>
                </div>
            </div>
        </header>
    )
}

export default Header