import React from 'react'
import { Link, Route, useParams, useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import { useState, useEffect } from 'react'
import Alert from '../components/Alert'

const NewPassword = () => {
    let navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [validToken, setTokenValid] = useState(false)
    const [alert, setAlert] = useState({})
    const [passwordModified, setPasswordModified] = useState(false)
    const { token } = useParams();
    useEffect(() => {
        const validateToken = async () => {
            try {
                //Todo: move to axios client
                await axiosClient(`/users/forgot-password/${token}`)
                setTokenValid(true)
            } catch (error) {
                console.log(error.response)
            }
        }
        validateToken()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password.length < 6) {
            setAlert({ msg: "Password is too short, min 6 characters ", type: 'error' })
            return
        }

        try {
            const url = `/users/forgot-password/${token}`
            const { data } = await axiosClient.post(url, { password })
            setAlert({ msg: data.msg + '🥳', type: 'success' })
            setTimeout(() => {
                navigate('/')
            }, 3000);
        } catch (error) {
            setAlert({ msg: error.response.data.msg, type: 'error' })
        }
    }
    return (
        <>
            <Alert message={alert} />
            <h1 className='text-sky-600 font-black text-6xl capitalize'>Restore your<span className='text-slate-300'> password</span></h1>

            {validToken ?
                (
                    <form action="" className='my-10 bg-gray-900 text-white shadow rounded-lg py-5 px-10' onSubmit={handleSubmit}>

                <div className='my-5'>
                    <label className='uppercase text-gray-300 block text-xl mb-3 font-bold' htmlFor="password">New password: </label>

                            <input className='w-full bg-gray-600 text-sky-500 placeholder-sky-500 py-2 px-2 rounded-lg shadow shadow-gray-400' type="password" id='password' placeholder='Your new password (min 6 characters)' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className='flex mt-5 mb-5'>
                    <div className='md:w-1/3 lg:w-1/2 '></div>
                    <input type="submit" value='Save new password' className='bg-sky-600 w-full py-2 rounded shadow mt-2 uppercase font-bold hover:cursor-pointer hover:bg-sky-900 animate-pulse transition-colors' />
                </div>
                    </form>
                )
                :
                (<>
                    <h1 className='mt-40 text-slate-300 font-black p-10 bg-gray-600 rounded-lg text-6xl capitalize'>Invalid token<span className='text-sky-600'> try again</span></h1>
                    <nav className='lg:flex lg:justify-between'>
                        <Link className='block text-center my-5 text-slate-400' to='/'>Log in!</Link>
                <Link className='block text-center my-5 text-slate-400' to='forgot-password'>Forgot password?</Link>
            </nav>
                </>
                )}

            {passwordModified &&
                (<nav className='lg:flex lg:justify-between'>
                    <Link className='block text-center my-5 text-slate-400' to='/'>Log in!</Link>
                    <Link className='block text-center my-5 text-slate-400' to='forgot-password'>Forgot password?</Link>
                </nav>
                )}
        </>
    )
}

export default NewPassword