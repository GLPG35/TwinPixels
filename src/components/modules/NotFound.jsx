import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../../scss/notFound.scss'

const NotFound = ({ title, message, icon, btnIcon, btnText, route, height = undefined }) => {
    const navigate = useNavigate()

    return (
        <div className="notFound" style={{height}}>
            <div className="icon">
                {icon}
            </div>
            <h3>{title}</h3>
            <span>{message}</span>
            <motion.div className="button">
                <button onClick={() => navigate(route)}>
                    {btnIcon} {btnText}
                </button>
            </motion.div>
        </div>
    )
}

export default NotFound