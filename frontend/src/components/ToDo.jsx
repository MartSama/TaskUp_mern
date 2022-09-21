import React from 'react'
import { useEffect } from 'react'
import { formatDate } from '../helpers/formatDate'
import useProject from '../hooks/useProject'
import useAdmin from '../hooks/useAdmin'
const ToDo = ({ todo }) => {
    const { handleModalEditTodo, handleModalDeleteTodo, handleAlert, completeTodo } = useProject()
    const { name, description, deadline, priority, state, _id } = todo
    const deadlineFormated = formatDate(deadline)
    const admin = useAdmin()
    useEffect(() => {
        handleAlert({})
    }, [])
    return (
        <div className='flex justify-between items-center flex-col lg:flex-row odd:bg-gray-500 odd:text-black p-5 rounded-xl'>
            <div>
                <p className='mb-2 text-xl'>{name}</p>
                <p className='mb-2 text-sm even:text-gray-200  uppercase'>{description}</p>
                <p className='mb-2 '>{deadlineFormated}</p>
                <p className='mb-2 text- text-sky-200'>Priority: {priority}</p>
                {state && <p className='text-amber-500 '>Complete by: {todo.complete.name}</p>}
            </div>
            <div className='flex gap-4  text-white mt-4 lg:mt-0'>
                <button onClick={() => completeTodo(_id)} className={`${state ? 'bg-sky-600' : 'bg-gray-900'} uppercase font-bold text-sm rounded-lg px-4 py-3`}>{state ? 'Complete' : 'Incomplete'}</button>

                {admin && (
                    <>
                        <button onClick={() => handleModalEditTodo(todo)} className='bg-indigo-600 uppercase font-bold text-sm rounded-lg px-4 py-3'>Edit</button>
                        <button onClick={() => handleModalDeleteTodo(todo)} className='bg-red-600 uppercase font-bold text-sm rounded-lg px-4 py-3'>Delete</button>
                    </>)}

            </div>
        </div>
    )
}

export default ToDo