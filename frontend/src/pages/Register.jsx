import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import axios from 'axios'
const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [alert, setAlert] = useState({})
    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([name, email, password, repeatPassword].includes('')) {
            setAlert({ msg: 'All fields are necessary 😕', type: 'error' })
            return
        }
        if (password !== repeatPassword) {
            setAlert({ msg: 'The password confirmation does not match 🔐', type: 'error' })
            return
        }
        if (password.length < 6) {
            setAlert({ msg: 'Password are too short, 6 character minumun 🔐', type: 'error' })
            return
        }
        setAlert({})
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, { name, password, email })
            setAlert({ msg: data.msg, type: "success" })
            setName('')
            setEmail('')
            setPassword('')
            setRepeatPassword('')
        } catch (error) {
            setAlert({ msg: error.response.data?.msg, type: 'warning' })
        }
        console.log('Creating')
    }

    return (
        <>
            {alert.msg && <Alert message={alert} />}
            <h1 className='text-sky-600 font-black text-6xl capitalize'>Create your account and  <span className='text-slate-300'> manage your projects</span></h1>

            <form action="" className='my-10 bg-gray-900 text-white shadow rounded-lg py-5 px-10' onSubmit={handleSubmit}>
                <div className='my-5'>
                    <label className='uppercase text-gray-300 block text-xl mb-3 font-bold' htmlFor="name">Name: </label>

                    <input className='w-full bg-gray-600 text-sky-500 placeholder-white placeholder-opacity-70 py-2 px-2 rounded-lg shadow shadow-gray-400' type="text" id='name' value={name} onChange={e => setName(e.target.value)} placeholder='Vania Lopez...' />
                </div>
                <div className='my-5'>
                    <label className='uppercase text-gray-300 block text-xl mb-3 font-bold' htmlFor="email">Email: </label>

                    <input className='w-full bg-gray-600 text-sky-500 placeholder-white placeholder-opacity-70 py-2 px-2 rounded-lg shadow shadow-gray-400' type="email" id='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='yourname@mail.com ...' />
                </div>

                <div className='my-5'>
                    <label className='uppercase text-gray-300 block text-xl mb-3 font-bold' htmlFor="password">Password: </label>

                    <input className='w-full bg-gray-600 text-sky-500 placeholder-white placeholder-opacity-70 py-2 px-2 rounded-lg shadow shadow-gray-400' type="password" id='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter a pass > 6' />
                </div>
                <div className='my-5'>
                    <label className='uppercase text-gray-300 block text-xl mb-3 font-bold' htmlFor="password2">Repeat password: </label>

                    <input className='w-full bg-gray-600 text-sky-500 placeholder-white placeholder-opacity-70 py-2 px-2 rounded-lg shadow shadow-gray-400' type="password" id='password2' placeholder='Confirm your pass' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                </div>
                <div className='flex mt-5 mb-5'>
                    <div className='md:w-1/3 lg:w-1/2 '></div>
                    <input type="submit" value='Create account' className='bg-sky-600 w-full py-2 rounded shadow mt-2 uppercase font-bold hover:cursor-pointer hover:bg-sky-900 animate-pulse transition-colors' />
                </div>
            </form>

            <nav className='lg:flex lg:justify-between'>
                <Link className='block text-center my-5 text-slate-400' to='/'>Have an account? Log In!</Link>
                <Link className='block text-center my-5 text-slate-400' to='/forgot-password'>Forgot password?</Link>
            </nav>
        </>
    )
}

export default Register