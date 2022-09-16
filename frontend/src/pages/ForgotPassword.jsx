import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import axiosClient from '../config/axiosClient'
const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [alert, setAlert] = useState({})
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const handleSubmit = async (e) => {
        e.preventDefault()
        setAlert({})
        if (!email.match(regex)) {
            setAlert({ msg: 'Your email is neccessary', type: 'error' })
            return
        }

        try {
            const { data } = await axiosClient.post(`/users/forgot-password`, { email })
            setAlert({ msg: data.msg, type: 'success' })

        } catch (error) {
            console.log(error.response)
        }
    }


    return (
        <>
            {alert.msg && <Alert message={alert} />}
            <h1 className='text-sky-600 font-black text-6xl capitalize'>Change <span className='text-slate-300'> password</span></h1>

            <form action="" className='my-10 bg-gray-900 text-white shadow rounded-lg py-5 px-10' onSubmit={handleSubmit} onChange={(e) => setAlert({})}>
                <div className='my-5'>
                    <label className='uppercase text-gray-300 block text-xl mb-3 font-bold' htmlFor="email">Email: </label>

                    <input className='w-full bg-gray-600 text-sky-500 placeholder-sky-500 py-2 px-2 rounded-lg shadow shadow-gray-400' value={email}
                        onChange={(e) => setEmail(e.target.value)} type="email" id='email' placeholder='yourname@mail.com ...' />
                </div>


                <div className='flex mt-5 mb-5'>
                    <div className='md:w-1/3 lg:w-1/2 '></div>
                    <input type="submit" value={'Send email'} className='bg-sky-600 w-full py-2 rounded shadow mt-2 uppercase font-bold hover:cursor-pointer hover:bg-sky-900 animate-pulse transition-colors' />
                </div>
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link className='block text-center my-5 text-slate-400' to='/register'>No account? Create one!</Link>
                <Link className='block text-center my-5 text-slate-400' to='/'>Have account? LogIn!</Link>
            </nav>
        </>
    )
}

export default ForgotPassword
