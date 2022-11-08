import { globalContext } from '../../App'
import { useContext } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'

const CartWidget = () => {
    const { cart } = useContext(globalContext)
    
    return (
        <>
            <RiShoppingCartLine />
            <span className='quantity'>
                {cart.length <= 99 ? cart.length : '+99'}
            </span>
        </>
    )
}

export default CartWidget