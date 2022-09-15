import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
const Sidebar = () => {
    const { auth } = useAuth()
    return (
        <aside className='md:w-75 lg:w-80 px-5 py-10 border-r border-r-violet-500'>
            <p className='text-xl font-bold'>Hola, {auth.name}</p>

            <Link to='new-project' className='w-full p-3 uppercase font-bold bg-violet-400 block mt-5 text-center rounded-lg'>New project</Link>
        </aside>
    )
}

export default Sidebar