import './scss/order.scss'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOrder } from './firebase/client'
import Spinner from './components/modules/Spinner'
import { RiArrowDropLeftLine, RiWalletLine, RiHome2Fill } from 'react-icons/ri'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import NotFound from './components/modules/NotFound'

const Order = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(undefined)
    const [open, setOpen] = useState(false)
    const [preview, setPreview] = useState(null)
    const [y, setY] = useState(0)

    useEffect(() => {
        getOrder(id).then(setOrder)

        document.addEventListener('scroll', () => setY(window.scrollY))

        return () => document.removeEventListener('scroll', () => setY(window.scrollY))
    }, [])

    return (
        <div className="orderContainer">
            <motion.div className="container1" layoutScroll>
                {order === undefined ?
                    <Spinner />
                : order === null ?
                    <NotFound title={"This order doesn't exist!"}
                    message={'Please check your URL or go back home'}
                    icon={<RiWalletLine />} btnText={'Go home'}
                    btnIcon={<RiHome2Fill />} height='calc(100vh - 6em)'
                    route={'/'} />
                :
                    <LayoutGroup>
                        <motion.div layout='position' className="orderWrapper" onClick={() => preview && setPreview(null)}>
                            <div className="left" onClick={e => e.stopPropagation()}>
                                <motion.div layout='position' className="order">
                                    <div className="info">
                                        <div className="top">
                                            <div className="left">
                                                <div className="price">
                                                    ${order.items.reduce((prev, current) => {
                                                        return prev + current.price * current.quantity
                                                    }, 0)}
                                                </div>
                                                <div className="date">
                                                    {new Date(order.date.seconds * 1000).toLocaleDateString('en-uk', {
                                                        day: 'numeric',
                                                        month: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <span>Order</span>
                                            <div className="id">
                                                #{order.id}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div layout className="orderDetails">
                                    <motion.div layout='position' className="openDetails" onClick={() => setOpen(!open)}>
                                        <span>See {!open ? 'more' : 'less'}</span>
                                        <motion.div layout='position' className="icon" animate={{rotate: open ? -90 : 0}}>
                                            <RiArrowDropLeftLine />
                                        </motion.div>
                                    </motion.div>
                                    <AnimatePresence>
                                        {open &&
                                            <motion.div layout exit={{height: 0, paddingBottom: 0}}
                                            className="seeDetails">
                                                <div className="orderNumber">
                                                    <div className="id">
                                                        Order #{order.id}
                                                    </div>
                                                    <div className="date">
                                                        {new Date(order.date.seconds * 1000).toLocaleDateString('en-uk', {
                                                            day: 'numeric',
                                                            month: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                </div>
                                                <div className="items">
                                                    {order.items.map(({id, title, quantity, price, pic}) => {
                                                        return (
                                                            <div key={id} className="item">
                                                                <div className="title">
                                                                    <div className="name"
                                                                    onClick={() => setPreview({title, price, pic})}>
                                                                        {title}
                                                                    </div>
                                                                    <div className="price">
                                                                        ${price}
                                                                    </div>
                                                                </div>
                                                                <div className="quantity">
                                                                    <span>Quantity</span>
                                                                    <span>x{quantity}</span>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </motion.div>
                                        }
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                            <AnimatePresence>
                                {preview && open &&
                                    <motion.div layout='position'  onClick={e => e.stopPropagation()}
                                    initial={{x: '-50%', opacity: 0}} animate={{x: 0, opacity: 1}} 
                                    exit={{x: '-50%', opacity: 0}} transition={{type: 'ease'}}
                                    className="right" style={{translateY: y}}>
                                        <div className="pic">
                                            <AnimatePresence>
                                                <motion.img initial={{opacity: 0}}
                                                animate={{opacity: 1}} exit={{opacity: 0}}
                                                key={preview.title} src={preview.pic} />
                                            </AnimatePresence>
                                        </div>
                                        <div className="info">
                                            <div className="title">
                                                {preview.title}
                                            </div>
                                            <div className="price">
                                                ${preview.price}
                                            </div>
                                        </div>
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </motion.div>
                    </LayoutGroup>
                }
            </motion.div>
        </div>
    )
}

export default Order