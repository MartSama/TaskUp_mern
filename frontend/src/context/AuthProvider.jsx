import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axiosClient";
const AuthContext = createContext()
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [auth, setAuth] = useState({})
    const [loadingData, setLoadingData] = useState(true)
    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                setLoadingData(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await axiosClient('/users/profile', config)
                setAuth(data)
                navigate('/projects')
            } catch (error) {
                setAuth({})
                console.log(error.response.data.msg)
            }
            setLoadingData(false)

        }
        authUser()
    }, [])

    return (
        <AuthContext.Provider value={{ auth, setAuth, loadingData }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }

export default AuthContext
