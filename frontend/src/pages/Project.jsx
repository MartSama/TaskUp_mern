import { useParams } from "react-router-dom"
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
    return (
        //ToDo: add spinner
        loading ? <SkeletonLoader /> :
            (<div className="">
                <h1 className="font-black text-4xl">
                    {name}
                </h1>
            </div>)
    )
}

export default Project