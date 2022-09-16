import { useState, useEffect, createContext } from "react";
import Alert from '../components/Alert'
const ProjectContext = createContext()
import axiosClient from '../config/axiosClient'
import { useNavigate } from "react-router-dom";

const ProjectProvider = ({ children }) => {
    let navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [alert, setAlert] = useState({})

    const handleAlert = (alert) => {
        setAlert(alert)
    }

    const submitProject = async (projects) => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post('/projects', projects, config)
            setAlert({ msg: 'Project created correctly 🥳', type: 'success' })
            setTimeout(() => {
                navigate('projects')
            }, 4000);
            na
        } catch (error) {
            console.log(error.response)
        }
    }


    return (
        <ProjectContext.Provider value={{ handleAlert, alert, submitProject }}>
            {children}
        </ProjectContext.Provider>
    )
}

export { ProjectProvider }

export default ProjectContext