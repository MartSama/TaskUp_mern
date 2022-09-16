import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import axiosClient from '../config/axiosClient'
import useAuth from '../hooks/useAuth'
const Login = () => {
    let navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})
    const { setAuth } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if ([email, password].includes('')) {
            setAlert({ msg: "All fields are necessary", type: "error" })
            return
        }

        try {
            const { data } = await axiosClient.post('/users/login', { email, password })
            setAlert({})
            localStorage.setItem("token", data.token)
            setAuth(data)
            navigate('/projects')
        } catch (error) {
            setAlert({ msg: error.response.data.msg, type: "error" })
        }
    }
    return (
        <>
            {alert?.msg && <Alert message={alert} />}
            <h1 className='text-sky-600 font-black text-6xl capitalize'>Login and manage your <span className='text-slate-300'> projects</span></h1>

            <form action="" className='my-10 bg-gray-900 text-white shadow rounded-lg py-5 px-10' onSubmit={handleSubmit} onChange={(e) => setAlert({})} >
                <div className='my-5'>
                    <label className='uppercase text-gray-300 block text-xl mb-3 font-bold' htmlFor="email">Email: </label>

                    <input className='w-full bg-gray-600 text-sky-500 placeholder-sky-500 py-2 px-2 rounded-lg shadow shadow-gray-400' type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='yourname@mail.com ...' />
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-300 block text-xl mb-3 font-bold' htmlFor="password">Password: </label>

                    <input className='w-full bg-gray-600 text-sky-500 placeholder-sky-500 py-2 px-2 rounded-lg shadow shadow-gray-400' type="password" id='password' placeholder='**********' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='flex mt-5 mb-5'>
                    <div className='md:w-1/3 lg:w-1/2 '></div>
                    <input type="submit" value='LogIn' className='bg-sky-600 w-full py-2 rounded shadow mt-2 uppercase font-bold hover:cursor-pointer hover:bg-sky-900 animate-pulse transition-colors' />
                </div>
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link className='block text-center my-5 text-slate-400' to='register'>No account? Create one!</Link>
                <Link className='block text-center my-5 text-slate-400' to='forgot-password'>Forgot password?</Link>
            </nav>
        </>
    )
}

export default Login