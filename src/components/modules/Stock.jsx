import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { RiPencilFill, RiCheckFill } from 'react-icons/ri'
import { getItems, updateStock } from '../../firebase/client'
import '../../scss/stock.scss'
import Spinner from './Spinner'

const Stock = () => {
    const [items, setItems] = useState(undefined)
    const [stockId, setStockId] = useState(null)
    const [spinner, setSpinner] = useState(false)

    useEffect(() => {
        !items && getItems().then(setItems)
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        const { stock: { value: stock } } = e.target

        setSpinner(true)

        updateStock(stockId, Number(stock)).then(() => {
            getItems().then(data => {
                setItems(data)
                setSpinner(false)
                setStockId(null)
            })
        })
    }

    return (
        <div className="stockContainer">
            {spinner && <Spinner />}
            <h2>Stock</h2>
            <div className="itemList">
                <AnimatePresence>
                    {stockId &&
                        <motion.div className="modalContainer"
                        initial={{opacity: 0}} animate={{opacity: 1}}
                        exit={{opacity: 0}} onClick={() => setStockId(null)}>
                            <motion.div className="stockModalWrapper"
                            initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0.5, opacity: 0}}
                            onClick={e => e.stopPropagation()}>
                                <form className="stockModal"
                                onSubmit={handleSubmit}>
                                    <h3>Set Stock</h3>
                                    <input type="number" name='stock' required min='0' max='9999'
                                    placeholder='Stock' />
                                    <div className="button">
                                        <button type='submit'>
                                            <RiCheckFill />
                                            Set Stock
                                        </button>
                                    </div>
                                </form>
                                <div className="shadow"></div>
                            </motion.div>
                        </motion.div>
                    }
                </AnimatePresence>
                {items &&
                    items.map(({id, title, pic, stock}) => {
                        return (
                            <div className="item" key={id}>
                                <div className="pic">
                                    <img src={pic} />
                                </div>
                                <div className="content">
                                    <div className="title">
                                        {title}
                                    </div>
                                    <div className="stock">
                                        Stock: {stock}
                                    </div>
                                </div>
                                <div className="changeStock"
                                onClick={() => setStockId(id)}>
                                    <RiPencilFill />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Stock