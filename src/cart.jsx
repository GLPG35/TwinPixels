import { globalContext } from './App'
import { useContext, useState, useEffect } from 'react'
import './scss/cart.scss'
import { RiHome2Fill, RiHandHeartLine } from 'react-icons/ri'
import { motion, AnimatePresence } from 'framer-motion'
import { getItems } from './firebase/client'
import Spinner from './components/modules/Spinner'
import Modal from './components/modules/Modal'
import NotFound from './components/modules/NotFound'
import CheckoutForm from './components/modules/CheckoutForm'
import CheckoutList from './components/modules/CheckoutList'
import CartList from './components/modules/CartList'

const Cart = () => {
    const { cart, setCart } = useContext(globalContext)
    const [items, setItems] = useState(undefined)
    const [modal, setModal] = useState(false)
    const [currentId, setCurrentId] = useState(null)
    const [buy, setBuy] = useState(false)

    useEffect(() => {
        cart.length ? getItems()
        .then(data => {
            const newCart = cart.map(item => {
                const findItem = data.find(x => x.id == item.id)
                const { stock } = findItem

                if (item.quantity > stock) {
                    return {
                        ...item,
                        quantity: stock
                    }
                } else {
                    return item
                }
            })

            localStorage.setItem('cart', JSON.stringify(newCart))
            setCart(JSON.parse(localStorage.getItem('cart')))

            setItems(data)
        })
        : setItems(null)
    }, [])

    const handleDelete = id => {
        setModal(false)
        const newCart = [...cart]
        const findItem = newCart.findIndex(x => x.id == id)
        newCart.splice(findItem, 1)

        localStorage.setItem('cart', JSON.stringify(newCart))
        setCart(JSON.parse(localStorage.getItem('cart')))
        setCurrentId(null)
    }

    return (
        <div className="cartContainer">
            <div className="container1">
                <AnimatePresence>
                    {modal &&
                        <Modal message={'Are you sure to delete this item?'} 
                        handleClose={() => setModal(false)} id={currentId}
                        handleConfirm={handleDelete} />
                    }
                    {buy &&
                        <CheckoutForm handleClose={() => setBuy(false)} />
                    }
                </AnimatePresence>
                <h2>Cart</h2>
                <AnimatePresence>
                    {cart.length && items === undefined && 
                        <motion.div className="spinnerWrapper"
                        exit={{opacity: 0}}>
                            <Spinner />
                        </motion.div>
                    }
                </AnimatePresence>
                <div className="content">
                    {!cart.length ?
                        <NotFound title={"You don't have anything here!"}
                        message={'Go buy something'} icon={<RiHandHeartLine />}
                        btnIcon={<RiHome2Fill />} btnText={'Go Home'}
                        route={'/'} />
                    : items &&
                        <>
                            <CartList openModal={() => setModal(true)} setCurrentId={setCurrentId} items={items} />
                            <CheckoutList buy={() => setBuy(true)} />
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart