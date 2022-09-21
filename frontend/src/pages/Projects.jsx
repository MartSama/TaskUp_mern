import { io } from 'socket.io-client'
import useProject from '../hooks/useProject'
import CardProject from '../components/CardProject'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
let socket;
const Projects = () => {
    const { projects } = useProject()

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
        socket.emit('try', 'mart')
    }, [])
    return (
        <>
            <h1 className='text-4xl font-black'>Projects</h1>

            <div className='bg-gray-400 shadow-md shadow-black mt-10 rounded-lg p-5 text-red-700 md:grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
                {projects.length ? projects.map((currentElement) => (
                    <CardProject key={currentElement._id} data={currentElement} />
                )) : <p>You dont have projects, create one, <Link to='new-project'><strong>Here</strong></Link></p>}
            </div>
        </>
    )
}

export default Projects