import { Link } from "react-router-dom"
const PreviewProject = ({ data }) => {
    const { name, _id, client } = data
    return (
        <Link to={`${_id}`}>
            <div className="p-5 bg-gray-700 hover:bg-white mb-5 rounded-lg text-center">
                <p className="font-bold text-black  mb-5 text-2xl">{name}</p>
                <p className="text-gray-400 italic">{client}</p>
            </div>
        </Link>
    )
}

export default PreviewProject