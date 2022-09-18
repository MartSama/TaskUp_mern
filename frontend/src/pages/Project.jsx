import { useParams, Link } from "react-router-dom"
import useProject from '../hooks/useProject'
import { useEffect, useState } from "react"
import SkeletonLoader from "../components/SkeletonLoader"
import ConfirmMessage from "../components/ConfirmMessage"
import ModalFormTodo from "../components/ModalFormTodo"
const Project = () => {
    const { getProject, project, loading, deleteProject, handleModalTodo } = useProject()
    const { id: token } = useParams()
    const [confirmMessage, setConfirmMessage] = useState(false)
    const [modal, setModal] = useState(false)
    const { name } = project
    useEffect(() => {
        getProject(token)
    }, [])
    const handleButtonDelete = (responseConfirm) => {
        setConfirmMessage(true)
        if (responseConfirm) {
            setConfirmMessage(!confirmMessage)
        } else {
            deleteProject(token)
            setConfirmMessage(false)
        }
    }

    if (loading) return <SkeletonLoader />
    return (
        <>
            <div className="flex flex-col sm:flex-row items-center justify-between">
            {confirmMessage && <ConfirmMessage confirmated={handleButtonDelete} />
            }
                <h1 className="font-black text-4xl">{name}</h1>
                <div className="md:flex items-center  font-black ">
                <Link to={`/projects/edit/${token}`} className='text-2xl uppercase text-bold'>
                        <div className="flex text-purple-600 border-2 border-transparent p-2 hover:border-violet-500 rounded-lg sm:mt-0 mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        <p className="mr-5">Edit</p>
                    </div>
                </Link >

                    <button onClick={handleButtonDelete} className="text-red-600 text-2xl sm:mt-0 mt-2">
                    <div className="flex p-2 border-2 border-transparent hover:border-red-400 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Delete
                    </div>
                </button>
                </div>
        </div >



            <button type="button" onClick={handleModalTodo} className="text-sm px-8 rounded-lg uppercase font-bold text-black text-center py-3 bg-violet-400 sm:mt-3 mt-4 sm:float-right flex gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
            </svg>New To do</button>
            <ModalFormTodo />
        </>

    )
}

export default Project