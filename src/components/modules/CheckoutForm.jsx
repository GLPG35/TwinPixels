import { motion } from 'framer-motion'
import Spinner from './Spinner'
import { uploadOrder } from '../../firebase/client'
import { Timestamp } from 'firebase/firestore'
import { useState, useContext } from 'react'
import { globalContext } from '../../App'
import { RiCheckFill } from 'react-icons/ri'

const CheckoutForm = ({ handleClose }) => {
    const [spinner, setSpinner] = useState(false)
    const [mailErr, setMailErr] = useState(false)
    const { cart, setCart } = useContext(globalContext) 

    const handleSubmit = e => {
        e.preventDefault()
        
        const {
            email: { value: email },
            cEmail: { value: cEmail },
            name: { value: name },
            address: { value: address },
            phone: { value: phone }
        } = e.target

        const date = Timestamp.fromDate(new Date())
        const totalPrice = cart.reduce((prev, current) => {
            return prev + Number(current.price) * Number(current.quantity)
        }, 0)

        if (email != cEmail) {
            setMailErr(true)
            return
        }

        setSpinner(true)

        uploadOrder(email, name, address, phone, cart, date)
        .then(data => {
            const id = data.id
            const orders = JSON.parse(localStorage.getItem('orders')) || []

            const newOrder = {
                id,
                date,
                price: totalPrice
            }

            orders.push(newOrder)

            localStorage.setItem('orders', JSON.stringify(orders))
            localStorage.setItem('cart', JSON.stringify([]))
            setCart(JSON.parse(localStorage.getItem('cart')))
            setSpinner(false)
            handleClose()
        })
    }

    return (
        <motion.div className="orderData"
        initial={{opacity: 0}} animate={{opacity: 1}}
        exit={{opacity: 0}} onClick={handleClose}>
            {spinner && <Spinner />}
            <motion.div className="formWrapper" onClick={e => e.stopPropagation()}
            initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0.5}}>
                <form onSubmit={handleSubmit}>
                    <h3>Fulfill your data</h3>
                    <div className="inputs">
                        <input type="email" name='email' placeholder='E-Mail' required
                        className={mailErr ? 'error' : undefined}
                        title={mailErr ? "Mail doesn't match" : undefined}
                        onChange={() => mailErr && setMailErr(false)} />
                        <input type="email" name='cEmail' placeholder='Confirm E-Mail' required
                        className={mailErr ? 'error' : undefined}
                        title={mailErr ? "Mail doesn't match" : undefined}
                        onChange={() => mailErr && setMailErr(false)} />
                        <input type="text" name='name' placeholder='Full Name' required />
                        <input type="text" name='address' placeholder='Address' required />
                        <input type="number" name='phone' placeholder='Phone Number' required />
                    </div>
                    <div className="button">
                        <button>
                            <RiCheckFill />
                            Finish Purchase
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    )
}

export default CheckoutForm