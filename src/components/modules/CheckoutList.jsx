import { useContext } from 'react'
import { RiBankCardLine } from 'react-icons/ri'
import { globalContext } from '../../App'

const CheckoutList = ({ buy }) => {
    const { cart } = useContext(globalContext)

    return (
        <div className="checkout">
            <div className="title">
                Checkout
            </div>
            <div className="itemList">
                {cart.map(({ id, title, quantity, price }) => {
                    return (
                        <div key={id} className="item">
                            <div className="description">
                                <div className="itemTitle">
                                    {title}
                                </div>
                                <div className="quantity">
                                    x{quantity}
                                </div>
                            </div>
                            <div className="itemPrice">
                                ${Number(price) * Number(quantity)}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="total">
                <div className="totalTitle">
                    Total
                </div>
                <div className="totalAmount">
                    ${cart.reduce((prev, current) => {
                        const { price: currentPrice, quantity: currentQuant } = current
                        const totalPrice = Number(currentPrice) * Number(currentQuant)

                        return prev + totalPrice
                    }, 0)}
                </div>
            </div>
            <div className="buy">
                <div className="button" onClick={buy}>
                    <button>
                        <RiBankCardLine />
                        Confirm Purchase
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutList