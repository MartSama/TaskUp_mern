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
    const [modalDeleteTodo, setModalDeleteTodo] = useState(false)
    const [todo, setTodo] = useState({})
    const [collaborator, setCollaborator] = useState({})
    const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false)

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
        }, 1000);
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
            setAlert({ msg: error.response.data.msg, type: 'error' })
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
            }, 1000);
        } catch (error) {
            console.log(error.respose)
        }
    }

    const handleModalTodo = () => {
        setModalFormTodo(!modalFormTodo)
        setTodo({})
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
            if (todo?.id) {
                await editTodo(todo, config)
            } else {
                await createTodo(todo, config)
            }
        } catch (error) {
            console.log(error.response)
        }
    }

    const editTodo = async (todo, config) => {
        try {
            const { data } = await axiosClient.put(`/toDo/${todo.id}`, todo, config)
            setAlert({ msg: 'ToDo updated correctly', type: 'success' })
            const projectUpdated = { ...project }
            projectUpdated.todos = projectUpdated.todos.map((element) => element._id === data._id ? data : element)
            setProject(projectUpdated)
            setTimeout(() => {
                setModalFormTodo(false)
                setAlert({})
            }, 1000);
        } catch (error) {
            console.log(error.response)
        }
    }

    const createTodo = async (todo, config) => {
        try {
            const { data } = await axiosClient.post('/toDo', todo, config)
            setAlert({ msg: 'ToDo created correctly', type: 'success' })
            const projectUpdated = { ...project }
            projectUpdated.todos = [...project.todos, data]
            setProject(projectUpdated)
            setTimeout(() => {
                setModalFormTodo(false)
                setAlert({})
            }, 1000);
        } catch (error) {
            console.log(error.response)
        }
    }

    const handleModalEditTodo = (todo) => {
        setTodo(todo)
        setModalFormTodo(true)
    }

    const handleModalDeleteTodo = (todo) => {
        setTodo(todo)
        setModalDeleteTodo(!modalDeleteTodo)
        handleAlert({})
    }

    const deleteTodo = async () => {
        const token = localStorage.getItem('token')
        if (!token) return
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const { data } = await axiosClient.delete(`/toDo/${todo._id}`, config)
            const projectUpdate = { ...project }
            projectUpdate.todos = projectUpdate.todos.filter((element) => element._id !== todo._id)
            setProject(projectUpdate)
            setAlert({ msg: data.msg, type: 'success' })
            setTimeout(() => {
                setModalDeleteTodo(false)
                setAlert({})
            }, 1000);

        } catch (error) {
            setAlert({ msg: error.response?.data.msg, type: 'error' })
        }
    }

    const submitCollaborator = async (email) => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const options = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post('projects/collaborators', { email }, options)
            setCollaborator(data)
            setAlert({})
        } catch (error) {
            setAlert({ msg: error.response.data.msg, type: 'error' })
            setCollaborator({})

        } finally {
            setLoading(false)
        }
    }

    const addCollaborator = async (email) => {
        setAlert({})
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const options = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post(`projects/collaborators/${project._id}`, email, options)
            setAlert({ msg: data.msg, type: 'success' })
            setCollaborator({})
            setTimeout(() => {
                setAlert({})
            }, 1000);
        } catch (error) {
            setCollaborator({})
            setAlert({ msg: error.response.data.msg, type: 'error' })
        }
    }

    const handleModalDeleteCollaborator = (team) => {
        setModalDeleteCollaborator(!modalDeleteCollaborator)
        setCollaborator(team)
    }

    const deleteCollaborator = () => {
        console.log(collaborator)
    }
    return (
        <ProjectContext.Provider value={{ projects, handleAlert, alert, submitProject, getProject, project, loading, deleteProject, modalFormTodo, handleModalTodo, submitTodo, handleModalEditTodo, todo, modalDeleteTodo, handleModalDeleteTodo, deleteTodo, submitCollaborator, collaborator, addCollaborator, handleModalDeleteCollaborator, modalDeleteCollaborator, deleteCollaborator }}>
            {children}
        </ProjectContext.Provider>
    )
}

export { ProjectProvider }

export default ProjectContext