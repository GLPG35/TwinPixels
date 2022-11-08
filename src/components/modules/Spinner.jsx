import { motion } from 'framer-motion'
import '../../scss/spinner.scss'

const Spinner = () => {
    return (
        <motion.div initial={{opacity: 0}}
        animate={{opacity: 1}} exit={{ opacity: 0 }} className="spinner">
            <div className="loader"></div>
        </motion.div>
    )
}

export default Spinner