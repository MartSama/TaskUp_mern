import React from 'react'
import { useState } from 'react'
import useProject from '../hooks/useProject'
import Projects from '../pages/Projects'
import Alert from './Alert'
const Form = () => {
    const { alert, handleAlert, submitProject } = useProject()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [client, setClient] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([name, description, deadline, client].includes('')) {
            handleAlert({ msg: 'All fieds are necessary', type: 'error' })
            return
        }
        submitProject({ name, description, deadline, client })
        setName('')
        setDescription('')
        setDeadline('')
        setClient('')
    }
    return (
        <>
            {alert.msg && <Alert message={alert} />}
            <form className='bg-gray-700 py-10 px-5 md:w-1/2 rounded-lg' onSubmit={handleSubmit} onChange={() => handleAlert({})}>
                <div className='w-[90%] mx-auto mb-5'>
                    <label htmlFor="name" className='text-white font-bold text-2xl italic block text-center'>Name </label>
                    <input type="text" className='w-full mt-2 py-2 rounded-xl bg-violet-200 shadow-md shadow-black px-2 placeholder-black' id='name' placeholder='Name of project' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='w-[90%] mx-auto mb-5'>
                    <label htmlFor="description" className='text-white font-bold text-2xl italic block text-center'>Description</label>
                    <textarea className='w-full mt-2 py-2 rounded-xl bg-violet-200 shadow-md shadow-black px-2 placeholder-black' id='description' placeholder='Description of project' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='w-[90%] mx-auto mb-5'>
                    <label htmlFor="deadline" className='text-white font-bold text-2xl italic block text-center'>Deadline</label>
                    <input type="date" className='w-full mt-2 py-2 rounded-xl bg-violet-200 shadow-md shadow-black px-2 placeholder-black' id='deadline' value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                </div>
                <div className='w-[90%] mx-auto mb-5'>
                    <label htmlFor="client" className='text-white font-bold text-2xl italic block text-center'>
                        Client
                    </label>
                    <input type="text" className='w-full mt-2 py-2 rounded-xl bg-violet-200 shadow-md shadow-black px-2 placeholder-black' id='client' placeholder='Name of project' value={client} onChange={(e) => setClient(e.target.value)} />
                </div>
                <div className='flex w-[90%] mx-auto'>
                    <div className='w-1/3'></div>
                    <input type="submit" value='Create Project' className='bg-transparent border-2 mt-2 border-pink-300 py-3 w-2/3  rounded-lg text-white hover:bg-gray-700 hover:cursor-pointer hover:border-gray-500 transition-colors' />
                </div>
            </form>
        </>
    )
}

export default Form