import { useState, useEffect, createContext } from "react";
const ProjectContext = createContext()
import axiosClient from '../config/axiosClient'
import { useNavigate } from "react-router-dom";


const ProjectProvider = ({ children }) => {
    let navigate = useNavigate()
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState({})
    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const getProjecst = async () => {
            try {
                const { data } = await axiosClient('/projects', options)
                setProjects(data)
            } catch (error) {
                console.log(error.response)
            }
        }
        getProjecst()
    }, [])

    const handleAlert = (alert) => {
        setAlert(alert)
    }

    const submitProject = async (project) => {
        try {
            const token = localStorage.getItem("token")
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post('/projects', project, config)
            setProjects([...projects, data])
            setAlert({ msg: 'Project created correctly 🥳', type: 'success' })
            setTimeout(() => {
                navigate('projects')
            }, 2000);
        } catch (error) {
            console.log(error)
        }
    }

    const getProject = async (tokenProject) => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient(`/projects/${tokenProject}`, options)
            setProject(data)
        } catch (error) {
            console.log(error.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ProjectContext.Provider value={{ projects, handleAlert, alert, submitProject, getProject, project, loading }}>
            {children}
        </ProjectContext.Provider>
    )
}

export { ProjectProvider }

export default ProjectContext