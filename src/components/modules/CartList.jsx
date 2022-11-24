import { useContext } from 'react'
import { RiAddFill, RiDeleteBinFill, RiSubtractFill } from 'react-icons/ri'
import { globalContext } from '../../App'
import { motion } from 'framer-motion'

const CartList = ({ openModal, setCurrentId, items }) => {
    const { cart, setCart } = useContext(globalContext)

    const handleDec = id => {
        const newCart = cart.map(x => 
            x.id == id ? {
                ...x,
                quantity: x.quantity > 1 ? x.quantity - 1 : x.quantity
            } : x
        )
        
        localStorage.setItem('cart', JSON.stringify(newCart))
        setCart(JSON.parse(localStorage.getItem('cart')))
    }
    
    const handleAdd = id => {
        const findItem = items.find(x => x.id == id)
        const { stock } = findItem
    
        const newCart = cart.map(x => 
            x.id == id ? {
                ...x,
                quantity: x.quantity < stock ? x.quantity + 1 : x.quantity
            } : x
        )
        
        localStorage.setItem('cart', JSON.stringify(newCart))
        setCart(JSON.parse(localStorage.getItem('cart')))
    }

    const confirmDelete = id => {
        openModal()
        setCurrentId(id)
    }

    return (
        <div className="list">
            {cart.map(({id, title, price, pic, quantity}) => {
                return (
                    <motion.div key={id} className="item" layoutId={id}>
                        <div className="pic">
                            <img src={pic} />
                        </div>
                        <div className="itemDetails">
                            <div className="info">
                                <div className="title">
                                    {title}
                                </div>
                                <div className="price">
                                    ${price}
                                </div>
                            </div>
                            <div className="actions">
                                <div className="buttons">
                                    <button className="btn add" onClick={() => handleDec(id)}>
                                        <RiSubtractFill />
                                    </button>
                                    <input type="number" value={quantity}
                                    onChange={e => e.currentTarget.value = e.currentTarget.value} />
                                    <button className="btn dec" onClick={() => handleAdd(id)}>
                                        <RiAddFill />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="deleteBtn" onClick={() => confirmDelete(id)}>
                            <RiDeleteBinFill />
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}

export default CartList