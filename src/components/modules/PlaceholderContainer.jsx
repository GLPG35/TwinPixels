import PlaceholderItem from './PlaceholderItem'
import { motion } from 'framer-motion'
import '../../scss/placeholderContainer.scss'

const PlaceholderContainer = () => {
    const placeholderQuant = [1, 2, 3, 4, 5]

    return (
        <motion.div className="placeholderContainer"
        initial={{opacity: 1}} exit={{opacity: 0}}>
            {placeholderQuant.map(el => <PlaceholderItem key={el} />)}
        </motion.div>
    )
}

export default PlaceholderContainer