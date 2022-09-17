import { useParams, Link } from "react-router-dom"
import useProject from '../hooks/useProject'
import { useEffect } from "react"
import SkeletonLoader from "../components/SkeletonLoader"
const Project = () => {
    const { getProject, project, loading } = useProject()
    const { id: token } = useParams()
    const { name } = project
    useEffect(() => {
        getProject(token)
    }, [])
    if (loading) return <SkeletonLoader />
    return (
        <Link to={`/projects/edit/${token}`} className='text-2xl uppercase text-bold'>
            <div className="flex items-center justify-between">
                <h1 className="font-black text-4xl">
                    {name}
                </h1>
                <div className="flex items-center text-purple-600 hover:text-amber-600 font-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    Edit
                </div>
            </div>
        </Link >
    )
}

export default Project