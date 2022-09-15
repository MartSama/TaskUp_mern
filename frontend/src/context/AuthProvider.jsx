import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/axiosClient";
const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                console.log("There's no token")
                return
            }
            const config = {
                headrs: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await axiosClient('/users/profile', config)
                console.log(data)
            } catch (error) {

            }
        }
        authUser()
    }, [])

    return (
        <AuthContext.Provider value={{ setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }

export default AuthContext
