import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
const ProtectedRoute = () => {
    const { auth, loadingData } = useAuth()
    if (loadingData) {
        //ToDo: add spiner
        return 'spinner'
    }
    return (
        <>
            {auth._id ? (
                <div className="bg-gray-500">
                    <Header />
                    <div className="md:flex md:min-h-screen">
                        <Sidebar />
                        <main className="flex-1 bg-gray-300 p-10">
                            <Outlet />
                        </main>
                    </div>
                </div>
            ) : <Navigate to={'/'} />}
        </>
    )
}

export default ProtectedRoute