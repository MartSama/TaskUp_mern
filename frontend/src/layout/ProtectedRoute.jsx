import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
const ProtectedRoute = () => {
    const { auth, loadingData } = useAuth()
    if (loadingData) {
        return 'spinner'
    }
    return (
        <>
            {auth._id ? <Outlet /> : <Navigate to={'/'} />}
        </>
    )
}

export default ProtectedRoute