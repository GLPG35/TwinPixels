import ItemDetail from './ItemDetail'
import { useNavigate, useParams } from 'react-router-dom'
import itemList from '../../db/items.json'
import { RiFileWarningLine, RiHome2Fill } from 'react-icons/ri'
import '../../scss/detailContainer.scss'

const ItemDetailContainer = () => {
    const { id } = useParams()
    const findItem = itemList.find(x => x.id == id)
    const navigate = useNavigate()
    
    return (
        <div className="details">
            <div className="container1">
                {findItem ? <ItemDetail {...findItem} />
                :
                    <div className="notFound">
                        <div className="icon">
                            <RiFileWarningLine />
                        </div>
                        <div className="content">
                            <div className="info">
                                <h2>Item Not Found</h2>
                                <span>Please search again or go back to the home page</span>
                            </div>
                            <div className='button'>
                                <button onClick={() => navigate('/')}>
                                    <RiHome2Fill /> Go Home
                                </button>
                            </div>
                        </div>
                    </div> 
                }
            </div>
        </div>
    )
}

export default ItemDetailContainer