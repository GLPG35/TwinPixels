import { RiAddFill, RiCheckFill } from 'react-icons/ri'
import { globalContext } from '../../App'
import { useContext, useState } from 'react'
import '../../scss/item.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import useAddToCart from '../../hooks/useAddToCart'

const Item = ({ id, title, pic, price }) => {
    const { setCart } = useContext(globalContext)
    const [added, setAdded] = useState(false)

	const handleAdd = (productID) => {
		useAddToCart(productID)
		setCart(JSON.parse(localStorage.getItem('cart')))

        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
	}

    return (
        <div key={id} className="card">
            <div className="pic">
                <img src={pic} alt={title} />
            </div>
            <div className="content">
                <div className="info">
                    <NavLink className="title" to={`/item/${id}`}>
                        {title}
                    </NavLink>
                    <span className="price">
                        ${price}
                    </span>
                </div>
                <div className="button">
                    <button onClick={e => {e.stopPropagation(), handleAdd(id)}}
                    className={!added ? 'add' : 'added'}>
                        <AnimatePresence>
                            {!added ? 
                                <motion.span key={1} initial={{opacity: 0}} animate={{opacity: 1}}
                                exit={{opacity: 0}}>
                                    <RiAddFill />
                                </motion.span>
                            :
                                <motion.span key={2} initial={{opacity: 0}} animate={{opacity: 1}}
                                exit={{opacity: 0}}>
                                    <RiCheckFill />
                                </motion.span>
                            }
                        </AnimatePresence>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Item