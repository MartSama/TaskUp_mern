import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import Alert from "../components/Alert"
const ConfirmAccount = () => {
    const [alert, setAlert] = useState({})
    const [accountConfirmed, setAccountConfirmed] = useState(false)
    const { token } = useParams()
    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const url = `http://localhost:4000/api/users/confirm-account/${token}`
                const { data } = await axios(url)
                setAlert({ msg: data.msg, type: 'success' })
                setAccountConfirmed(true)
            } catch (error) {
                setAlert({ msg: error.response.data.msg, type: 'error' })
            }
        }
        confirmAccount()
    }, [])
    return (
        <>
            {alert.msg && <Alert message={alert} />}
            <h1 className='text-sky-600 font-black text-6xl capitalize'>Confirm your accound and <span className='text-slate-300'> create new projects</span></h1>

            {accountConfirmed &&
                <nav className='mt-20'>
                    <Link className='block text-center my-5 text-purple-500 text-8xl animate-pulse ' to='/'>LogIn!</Link>
                </nav>
            }
        </>
    )
}

export default ConfirmAccount