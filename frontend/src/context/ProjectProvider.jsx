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
    const [modalFormTodo, setModalFormTodo] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const getProjects = async () => {
            try {
                const { data } = await axiosClient('/projects', options)
                setProjects(data)
            } catch (error) {
                console.log(error.response)
            }
        }
        getProjects()
    }, [])

    const handleAlert = (alert) => {
        setAlert(alert)
    }

    const submitProject = async (project) => {
            const token = localStorage.getItem("token")
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        if (project.id) {
            await editProject(project, config)
        } else {
            await newProject(project, config)
        }
        setTimeout(() => {
            navigate('projects')
        }, 2000);
    }

    const editProject = async (project, config) => {
        try {
            const { data } = await axiosClient.put(`/projects/${project.id}`, project, config)
            const arrayUpdated = projects.map((elemet) => elemet._id === data._id ? data : elemet)
            setProjects(arrayUpdated)
            setAlert({ msg: 'Project updated correctly ✍️' })
        } catch (error) {
            console.log(error.response)
        }
    }

    const newProject = async (project, config) => {
        try {
            const { data } = await axiosClient.post('/projects', project, config)
            setProjects([...projects, data])
            setAlert({ msg: 'Project created correctly 🥳', type: 'success' })

        } catch (error) {
            console.log(error.response)
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

    const deleteProject = async (id) => {

        try {
            const token = localStorage.getItem('token')
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axiosClient.delete(`/projects/${id}`, config)
            const arrayUpdated = projects.filter((element) => element._id !== id)
            setProjects(arrayUpdated)
            setTimeout(() => {
                navigate('/projects')
            }, 2000);
        } catch (error) {
            console.log(error.respose)
        }
    }

    const handleModalTodo = () => {
        setModalFormTodo(!modalFormTodo)
    }

    const submitTodo = async (todo) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post('/toDo', todo, config)
            setAlert({ msg: 'ToDo created correctly', type: 'success' })
            setTimeout(() => {
                handleModalTodo()
            }, 1000);
        } catch (error) {
            console.log(error.response)
        }
    }
    return (
        <ProjectContext.Provider value={{ projects, handleAlert, alert, submitProject, getProject, project, loading, deleteProject, modalFormTodo, handleModalTodo, submitTodo }}>
            {children}
        </ProjectContext.Provider>
    )
}

export { ProjectProvider }

export default ProjectContext