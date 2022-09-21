import useProject from "../hooks/useProject"

const Collaborator = ({ team }) => {
    const { handleModalDeleteCollaborator, modalDeleteCollaborator } = useProject()
    const { name, email } = team
    return (
        <>
            <div className='text-center p-3 sm:flex justify-between items-center odd:bg-amber-300 odd:text-black rounded-lg'>
                <div className="w-[80%] mx-auto sm:w-auto sm:mx-0">
                    <p>{name}</p>
                    <p>{email}</p>
                </div>
                <div className='w-[80%] sm:w-auto sm:mx-0 mx-auto  bg-red-600 rounded-lg px-6 py-4 uppercase text-black text-sm'>
                    <button type='button' onClick={() => handleModalDeleteCollaborator(team)}>Delete</button>
                </div>
            </div>

        </>
    )
}

export default Collaborator