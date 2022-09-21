import useProject from "./useProject";
import useAuth from './useAuth'

const useAdmin = () => {
    const { project } = useProject()
    const { auth } = useAuth()
    return project.creator === auth._id
}

export default useAdmin

