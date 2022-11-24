import { useNavigate } from 'react-router-dom'
import './scss/orders.scss'
import { RiArrowDropRightLine, RiGiftLine, RiHome2Fill } from 'react-icons/ri'
import NotFound from './components/modules/NotFound'

const Orders = () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || []
    const navigate = useNavigate()

    return (
        <div className="orders">
            <div className="container1">
                <h2>Orders</h2>
                {orders.length ?
                    <div className="orderList">
                        {orders.sort((a, b) => b.date.seconds * 1000 - a.date.seconds * 1000)
                        .map(({id, date, price}) => {
                            return (
                                <div key={id} className="order" onClick={() => navigate(`/order/${id}`)}>
                                    <div className="info">
                                        <div className="top">
                                            <div className="left">
                                                <div className="price">
                                                    ${price}
                                                </div>
                                                <div className="date">
                                                    {new Date(date.seconds * 1000).toLocaleDateString('en-uk', {
                                                        day: 'numeric',
                                                        month: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                            <div className="icon">
                                                <RiArrowDropRightLine />
                                            </div>
                                        </div>
                                        <div className="bottom">
                                            <span>Order</span>
                                            <div className="id">
                                                #{id}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                :
                    <NotFound title={"You don't have any orders!"}
                    message={'Go fill your cart!'} icon={<RiGiftLine />}
                    btnText={'Go home'} btnIcon={<RiHome2Fill />} route={'/'} />
                }
            </div>
        </div>
    )
}

export default Orders