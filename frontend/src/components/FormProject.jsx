import React, { useEffect } from 'react'
import { useState } from 'react'
import useProject from '../hooks/useProject'
import Projects from '../pages/Projects'
import Alert from './Alert'
import { useParams } from 'react-router-dom'
const FormProject = () => {
    const { id: token } = useParams()
    const { alert, handleAlert, submitProject, project } = useProject()
    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState('')
    const [client, setClient] = useState('')

    useEffect(() => {
        if (token) {
            setId(project._id)
            setName(project.name)
            setDescription(project.description)
            setDeadline(project.deadline?.split('T')[0])
            setClient(project.client)
        }
    }, [token])

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([name, description, deadline, client].includes('')) {
            handleAlert({ msg: 'All fieds are necessary', type: 'error' })
            return
        }
        submitProject({ id, name, description, deadline, client })
        setId(null)
        setName('')
        setDescription('')
        setDeadline('')
        setClient('')
        handleAlert({})
    }
    return (
        <>
            {alert.msg && <Alert message={alert} />}
            <form className='bg-gray-700 py-10 px-5 md:w-2/3 rounded-lg mx-auto mt-10 w-full' onSubmit={handleSubmit} onChange={() => handleAlert({})}>
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
                    <input type="submit" value={token ? 'Update project' : 'Create Project'} className='bg-transparent border-2 mt-2 border-pink-300 py-3 w-2/3  rounded-lg text-white hover:bg-gray-700 hover:cursor-pointer hover:border-gray-500 transition-colors' />
                </div>
            </form>
        </>
    )
}

export default FormProject