import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
const PreviewProject = ({ data }) => {
    const { name, _id, client, creator } = data
    const { auth } = useAuth()
    return (
        <Link to={`${_id}`}>
            <div className="p-5 bg-gray-700 hover:bg-white mb-5 rounded-lg text-center">
                <p className="font-bold text-black  mb-5 text-2xl">{name}</p>
                <p className="text-gray-400 italic">{client}</p>
                <p className="bg-rose-300 text-white py-1 w-1/2 mx-auto rounded-xl italic mt-5">{auth._id === creator ? 'Owner' : 'Collaborator'}</p>
            </div>
        </Link>
    )
}

export default PreviewProject