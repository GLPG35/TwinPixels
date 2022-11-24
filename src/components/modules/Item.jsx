import { RiAddFill, RiCheckFill, RiAlertFill } from 'react-icons/ri'
import { globalContext } from '../../App'
import { useContext, useState } from 'react'
import '../../scss/item.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLink, useNavigate } from 'react-router-dom'
import useAddToCart from '../../hooks/useAddToCart'
import imgPlaceholder from '/Image_Placeholder.webp'

const Item = ({ id, title, pic, price, stock }) => {
    const { setCart } = useContext(globalContext)
    const [added, setAdded] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

	const handleAdd = (productID) => {
		useAddToCart(productID).then(() => {
            setCart(JSON.parse(localStorage.getItem('cart')))

            setAdded(true)
            setTimeout(() => setAdded(false), 2000)
        })
	}

    return (
        <motion.div className="card" initial={{opacity: 0}} animate={{opacity: 1}}>
            <div className="pic" onClick={() => navigate(`/item/${id}`)}>
                <AnimatePresence>
                    {!loaded &&
                        <motion.img src={imgPlaceholder} className='placeholder'
                        initial={{opacity: 1}} animate={{opacity: 1}} exit={{opacity: 0}} />
                    }
                </AnimatePresence>
                <img loading='lazy' className={loaded ? 'ready' : undefined} src={pic} alt={title} onLoad={() => setLoaded(true)} />
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
                {stock ?
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
                :
                    <div className="button noStock" title='Out of stock!'>
                        <button>
                            <span>
                                <RiAlertFill />
                            </span>
                        </button>
                    </div>
                }
            </div>
        </motion.div>
    )
}

export default Item