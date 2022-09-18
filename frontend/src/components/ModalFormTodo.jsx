import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProject from '../hooks/useProject'
const priorityOptions = ['Low', 'Medium', 'High']
import { useParams } from 'react-router-dom'
const ModalFormTodo = () => {
    const { modalFormTodo, handleModalTodo, alert, handleAlert, submitTodo, todo } = useProject()
    const { id: project } = useParams()
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')
    const [deadline, setDeadline] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([name, description, deadline, priority].includes('')) {
            handleAlert({ msg: 'All fields are neccessary', type: 'error' })
            return
        }
        await submitTodo({ id, name, description, deadline, priority, project })
        setId('')
        setName('')
        setDescription('')
        setDeadline('')
        setPriority('')
    }

    useEffect(() => {
        if (todo?._id) {
            setId(todo._id)
            setName(todo.name)
            setDescription(todo.description)
            setDeadline(todo.deadline?.split('T')[0])
            setPriority(todo.priority)
            return
        }
        setId('')
        setName('')
        setDescription('')
        setDeadline('')
        setPriority('')
    }, [todo])
    return (
        <>
            <Transition.Root show={modalFormTodo} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalTodo}>
                    <div className="flex items-center sm:items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen align-top" aria-hidden="true">
                            &#8203;
                        </span>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 ">

                                {/* //class hidden */}
                                <div className=" sm:block absolute top-0 right-0 pt-4 pr-4">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={handleModalTodo}
                                    >
                                        <span className="sr-only">Cerrar</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>


                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <Dialog.Title as="h3" className="text-lg leading-6      font-bold text-gray-900">
                                            {id ? (<div className="sm:flex justify-between w-[80%] ">
                                                <h1 className="font-black text-2xl">Edit To Do: </h1>
                                                <p className="font-bold text-2xl text-pink-600 ">&lt;{todo.name} /&gt;</p>
                                            </div>) : 'Create To Do'}
                                        </Dialog.Title>
                                        <form className='my-10' onChange={() => handleAlert({})} onSubmit={handleSubmit}>
                                            <div className='mb-5'>
                                                <label className='text-gray-600 uppercase font-bold text-sm hover:cursor-pointer' htmlFor='name'>ToDo's name</label>
                                                <input type="text" id='name' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg italic' placeholder='Finish layout, do homework, etc.' value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                            <div className='mb-5'>
                                                <label className='text-gray-600 uppercase font-bold text-sm hover:cursor-pointer' htmlFor='description'>ToDo's description</label>
                                                <textarea id='description' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg italic' placeholder='Start making desing in figma, then create html...' value={description} onChange={(e) => setDescription(e.target.value)} />
                                            </div>
                                            <div className='mb-5'>
                                                <label className='text-gray-600 uppercase font-bold text-sm hover:cursor-pointer' htmlFor='deadline'>ToDo's deadline</label>
                                                <input type="date" id='deadline' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg italic' value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                                            </div>
                                            <div className='mb-5'>
                                                <label className='text-gray-600 uppercase font-bold text-sm hover:cursor-pointer' htmlFor='priority'>ToDo's priority</label>
                                                <select id='priority' className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg italic' value={priority} onChange={(e) => setPriority(e.target.value)}>
                                                    <option>Choose priority</option>
                                                    {priorityOptions.map((element) => <option key={element} value={element}>{element}</option>)}
                                                </select>
                                            </div>
                                            <input type='submit' className='bg-violet-600 p-3 float-right rounded-lg text-white uppercase animate-pulse font-bold w-1/2 sm:w-1/3 cursor-pointer' value={id ? "Save changes" : "Add ToDo"} />

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>


        </>
    )
}

export default ModalFormTodo