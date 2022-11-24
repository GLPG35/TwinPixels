import { globalContext } from '../../App'
import { useContext } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'

const CartWidget = () => {
    const { cart } = useContext(globalContext)
    const reduceCart = cart.reduce((prev, curr) => Number(prev) + Number(curr.quantity), 0)
    
    return (
        <>
            <RiShoppingCartLine />
            <span className='quantity'>
                {reduceCart <= 99 ? reduceCart : '+99'}
            </span>
        </>
    )
}

export default CartWidget