import { useState, useContext } from 'react'
import { globalContext } from '../../App'
import { RiAddFill, RiSubtractFill, RiShoppingCartLine, RiCheckFill, RiAlertFill } from 'react-icons/ri'
import useAddToCart from '../../hooks/useAddToCart'
import '../../scss/itemCount.scss'

const ItemCount = ({ id, stock }) => {
    const { setCart } = useContext(globalContext)
    const [quant, setQuant] = useState(1)
    const [buy, setBuy] = useState(false)

    const handleDec = () => {
        quant > 1 && setQuant(Number(quant) - 1)
        quant < 1 && setQuant(1)
        quant > stock && setQuant(stock)
    }

    const handleAdd = () => {
        quant < stock && setQuant(Number(quant) + 1)
        quant > stock && setQuant(stock)
        quant < 1 && setQuant(1)
    }

    const handleSubmit = e => {
        e.preventDefault()

        setBuy(true)

        useAddToCart(id, quant).then(() => {
            setCart(JSON.parse(localStorage.getItem('cart')))

            setTimeout(() => {
                setBuy(false)
            }, 2000)
        })
    }
    
    return (
        <>
            {stock ?
                <form className="addToCart" onSubmit={handleSubmit}>
                    <div className="counter">
                        <button type='button' className="btn dec" onClick={handleDec}>
                            <RiSubtractFill />
                        </button>
                        <input type="number" min='1' max={stock} required
                        value={quant} onChange={e => setQuant(e.target.value)} />
                        <button type='button' className="btn add" onClick={handleAdd}>
                            <RiAddFill />
                        </button>
                    </div>
                    <div className="button">
                        <button className={!buy ? 'buy' : 'buy active'} type='submit'>
                            {!buy ? <><RiShoppingCartLine /> Buy</> : <><RiCheckFill /> Added</> } 
                        </button>
                    </div>
                </form>
            :
                <div className="noStock">
                    <div className="icon">
                        <RiAlertFill />
                    </div>
                    <span>Out of stock!</span>
                </div>
            }
        </>
    )
}

export default ItemCount