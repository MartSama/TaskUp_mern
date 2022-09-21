import React from 'react'
import { useState } from 'react'
import useProject from '../hooks/useProject'
import Alert from '../components/Alert'
const FormCollaborator = () => {
    const { handleAlert, alert, submitCollaborator } = useProject()
    const [email, setEmail] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === '') {
            handleAlert({ msg: 'Email is necessary', type: 'error' })
            return
        }
        submitCollaborator(email)
    }
    return (
        <>
            <form className='mb-5 bg-gray-700 py-10 px-5 sm:w-2/3 rounded-lg mx-auto mt-10 w-full' onSubmit={handleSubmit} onChange={() => handleAlert({})}>
                <div className='w-[90%] mx-auto mb-5'>
                    <label htmlFor="email" className='text-white font-bold text-2xl italic block text-center'>Email </label>
                    <input type="text" className='w-full mt-2 py-2 rounded-xl bg-violet-200 shadow-md shadow-black px-2 placeholder-black' id='email' placeholder='Email of user' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='flex w-[90%] mx-auto'>
                    <div className='w-1/3'></div>
                    <input type="submit" className='bg-transparent border-2 mt-2 border-pink-300 py-3 px-1 sm:w-2/3  rounded-lg text-white hover:bg-gray-700 hover:cursor-pointer hover:border-gray-500 transition-colors' value='Look for collaborator' />
                </div>
            </form>
            {alert.msg && <Alert message={alert} />}
        </>
    )
}

export default FormCollaborator