import useProject from "../hooks/useProject"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import SkeletonLoader from "../components/SkeletonLoader"
import FormProject from "../components/FormProject"
const EditProject = () => {
    const { project, getProject, loading, handleAlert } = useProject()
    const { id: token } = useParams()

    useEffect(() => {
        handleAlert({})
        getProject(token)
    }, [])
    if (loading) return <SkeletonLoader />
    return (
        <>
            <div className="flex justify-between">
                <h1 className="font-black text-4xl">Edit project: </h1>
                <p className="font-bold text-4xl text-pink-600">&lt;{project.name} /&gt;</p>
            </div>
            <FormProject />
        </>
    )
}

export default EditProject