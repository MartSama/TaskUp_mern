import React from 'react'
import { Link } from 'react-router-dom'
const NewPassword = () => {
    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl capitalize'>Restore your<span className='text-slate-300'> password</span></h1>

            <form action="" className='my-10 bg-gray-900 text-white shadow rounded-lg py-5 px-10'>

                <div className='my-5'>
                    <label className='uppercase text-gray-300 block text-xl mb-3 font-bold' htmlFor="password">New password: </label>

                    <input className='w-full bg-gray-600 text-sky-500 placeholder-sky-500 py-2 px-2 rounded-lg shadow shadow-gray-400' type="password" id='password' placeholder='Your new password' />
                </div>

                <div className='flex mt-5 mb-5'>
                    <div className='md:w-1/3 lg:w-1/2 '></div>
                    <input type="submit" value='Save new password' className='bg-sky-600 w-full py-2 rounded shadow mt-2 uppercase font-bold hover:cursor-pointer hover:bg-sky-900 animate-pulse transition-colors' />
                </div>
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link className='block text-center my-5 text-slate-400' to='register'>No account? Create one!</Link>
                <Link className='block text-center my-5 text-slate-400' to='forgot-password'>Forgot password?</Link>
            </nav>
        </>
    )
}

export default NewPassword