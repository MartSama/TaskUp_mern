import FormCollaborator from "../components/FormCollaborator"
import { useEffect } from "react"
import useProject from "../hooks/useProject"
import { useParams } from "react-router-dom"
import Project from "./Project"
import SkeletonLoader from "../components/SkeletonLoader"
const NewCollaborator = () => {
    const { getProject, project, loading, collaborator, handleAlert, addCollaborator } = useProject()
    const { id: token } = useParams()
    useEffect(() => {
        getProject(token)
        handleAlert({})
    }, [])
    return (
        <>
            <h1 className="text-4xl font-black">Add collaborator to:  <span className="float-right text-violet-500">&lt;{project.name}/&gt;</span> </h1>

            <div className="mt-10 flex justify-center">
                <FormCollaborator />
            </div>
            {loading ? <SkeletonLoader /> : collaborator._id && (
                <div className="flex justify-center mt-10">
                    <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow">
                        <h2 className="text-center mb-10 text-2xl font-bold">Teammate: </h2>
                        <div className="text-center sm:flex justify-between items-center">
                            <p className=" first-letter:uppercase mb-2">{collaborator.name}</p>
                            <button type="button" className=" bg-pink-300 py-3 rounded-lg uppercase text-black font-bold text-sm px-3" onClick={() => addCollaborator({ email: collaborator.email })}>Add to project</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default NewCollaborator