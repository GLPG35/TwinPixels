import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { globalContext } from './App'
import Spinner from './components/modules/Spinner'
import './scss/dashboard.scss'
import { AnimatePresence } from 'framer-motion'

const Dashboard = () => {
    const { user } = useContext(globalContext)
    const navigate = useNavigate()

    useEffect(() => {
        user === null && navigate('/login')
    }, [user])

    return (
        <div className="dashboard" >
            <div className="container1">
                <AnimatePresence>
                    {!user && <Spinner />}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Dashboard