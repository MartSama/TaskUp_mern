import useProject from "../hooks/useProject"

const Collaborator = ({ team }) => {
    const { handleModalDeleteCollaborator, modalDeleteCollaborator } = useProject()
    const { name, email } = team
    return (
        <>
            <div className='p-3 sm:flex justify-between items-center odd:bg-amber-300 odd:text-black rounded-lg'>
                <div>
                    <p>{name}</p>
                    <p>{email}</p>
                </div>
                <div className='bg-red-600 rounded-lg px-6 py-4 uppercase text-black text-sm'>
                    <button type='button' onClick={() => handleModalDeleteCollaborator(team)}>Delete</button>
                </div>
            </div>

        </>
    )
}

export default Collaborator