import React from 'react'
import { Link } from 'react-router-dom'
import useProject from '../hooks/useProject'
import LookUp from './LookUp'
const Header = () => {
    const { handleLookup } = useProject()
    return (
        <header className='px-4 py-5 bg-gray-400 border-b border-b-violet-600'>
            <div className='flex md:flex-row flex-col md:justify-between justify-center'>
                <Link to='/projects' className='text-4xl text-violet-600 font-black  mx-auto md:mx-0'>UpTask</Link>
                <button onClick={handleLookup} type="search" className='rounded-xl px-2 text-black border-2 border-violet-600 block mx-auto mt-5 md:mt-0 py-4 sm:w-1/3 md:w-1/4' >Look for project 🔍</button>
                <div className='flex items-center gap-4 justify-center mt-5 md:mt-0'>
                    <Link to='/projects' className='font-bold uppercase'>Projects</Link>
                    <button type="button" className='ml-2 py-2 px-4 bg-violet-300 rounded-md'>Log out</button>
                </div>
                <LookUp />
            </div>
        </header>
    )
}

export default Header