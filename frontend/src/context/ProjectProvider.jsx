import { useState, useEffect, createContext } from "react";
const ProjectContext = createContext()
import axiosClient from '../config/axiosClient'
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
let socket;
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
    const [lookup, setLookup] = useState(false)

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

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL)
    }, [])

    useEffect(() => {
        socket.on('todo added', (newTodo) => {
            console.log(newTodo)
        })
    })

    const handleAlert = (alert) => {
        setAlert(alert)
        setTimeout(() => {
            setAlert({})
        }, 2000);
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
            handleAlert({ msg: 'Project updated correctly ✍️' })
        } catch (error) {
            console.log(error.response)
        }
    }

    const newProject = async (project, config) => {
        try {
            const { data } = await axiosClient.post('/projects', project, config)
            handleAlert({ msg: 'Project created correctly', type: 'success' })
            setProjects([...projects, data])
        } catch (error) {
            handleAlert({ msg: error.response.data.msg, type: 'error' })
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
            handleAlert({ msg: error.response.data.msg, type: 'error' })
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
            handleAlert({ msg: 'ToDo updated correctly', type: 'success' })
            setTimeout(() => {
                setModalFormTodo(false)
            }, 1000);
            socket.emit('edit todo', data)
        } catch (error) {
            console.log(error.response)
        }
    }

    const createTodo = async (todo, config) => {
        try {
            const { data } = await axiosClient.post('/toDo', todo, config)
            handleAlert({ msg: data.msg, type: 'success' })

            socket.emit('create todo', data)
            setTimeout(() => {
                setModalFormTodo(false)
            }, 1000);
        } catch (error) {
            handleAlert({ msg: error.response.data.msg, type: 'error' })
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
            handleAlert({ msg: data.msg, type: 'success' })
            setTimeout(() => {
                setModalDeleteTodo(false)
            }, 1000);
            socket.emit('delete todo', todo)
            setTodo({})
        } catch (error) {
            handleAlert({ msg: error.response?.data.msg, type: 'error' })
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
            handleAlert({ msg: data.msg, type: 'success' })
        } catch (error) {
            handleAlert({ msg: error.response.data.msg, type: 'error' })
            setCollaborator({})
        } finally {
            setLoading(false)
        }
    }

    const addCollaborator = async (email) => {
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
            handleAlert({ msg: data.msg, type: 'success' })
            setCollaborator({})
        } catch (error) {
            setCollaborator({})
            handleAlert({ msg: error.response.data.msg, type: 'error' })
        }
    }

    const handleModalDeleteCollaborator = (team) => {
        setModalDeleteCollaborator(!modalDeleteCollaborator)
        setCollaborator(team)
    }

    const deleteCollaborator = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const options = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post(`/projects/delete-collaborator/${project._id}`, { id: collaborator._id }, options)

            const projectUpdated = { ...project }
            projectUpdated.team = projectUpdated.team.filter((element) => element._id !== collaborator._id)
            setProject(projectUpdated)
            handleAlert({ msg: data.msg, type: 'success' })
            setCollaborator({})
            setTimeout(() => {
                setModalDeleteCollaborator(false)
            }, 1000);
        } catch (error) {
            handleAlert({ msg: error.response.data.msg, type: 'error' })
        }
    }

    const completeTodo = async (id) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const options = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await axiosClient.post(`/toDo/state/${id}`, {}, options)
            socket.emit('complete todo', data)
            setTodo({})
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleLookup = () => {
        setLookup(!lookup)
    }

    const submitTodosProject = (newTodo) => {
        const projectUpdated = { ...project }
        projectUpdated.todos = [...projectUpdated.todos, newTodo]
        setProject(projectUpdated)
    }

    const deleteTodosProject = (deletedTodo) => {
        const projectUpdate = { ...project }
        projectUpdate.todos = projectUpdate.todos.filter((element) => element._id !== deletedTodo._id)
        setProject(projectUpdate)
    }

    const editTodosProject = (editedTodo) => {
        const projectUpdated = { ...project }
        projectUpdated.todos = projectUpdated.todos.map((element) => element._id === editedTodo._id ? editedTodo : element)
        setProject(projectUpdated)
    }

    const completeTodosProject = (completedTodo) => {
        const projectUpdated = { ...project }
        projectUpdated.todos = projectUpdated.todos.map((element) => element._id === completedTodo._id ? completedTodo : element)
        setProject(projectUpdated)
    }
    return (
        <ProjectContext.Provider value={{ projects, handleAlert, alert, submitProject, getProject, project, loading, deleteProject, modalFormTodo, handleModalTodo, submitTodo, handleModalEditTodo, todo, modalDeleteTodo, handleModalDeleteTodo, deleteTodo, submitCollaborator, collaborator, addCollaborator, handleModalDeleteCollaborator, modalDeleteCollaborator, deleteCollaborator, completeTodo, lookup, handleLookup, submitTodosProject, deleteTodosProject, editTodosProject, completeTodosProject }}>
            {children}
        </ProjectContext.Provider>
    )
}

export { ProjectProvider }

export default ProjectContext