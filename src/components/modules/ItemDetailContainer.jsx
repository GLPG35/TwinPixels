import ItemDetail from './ItemDetail'
import { useNavigate, useParams } from 'react-router-dom'
import { RiFileWarningLine, RiHome2Fill } from 'react-icons/ri'
import '../../scss/detailContainer.scss'
import { getItemFID } from '../../firebase/client'
import { useEffect, useState } from 'react'
import Spinner from './Spinner'
import NotFound from './NotFound'

const ItemDetailContainer = () => {
    const { id } = useParams()
    const [item, setItem] = useState(undefined)

    useEffect(() => {
        getItemFID(id).then(setItem)
    }, [id])
    
    return (
        <div className="details">
            <div className="container1">
                {item === undefined  ?
                    <Spinner />
                : item === null ?
                    <NotFound title={'Item not found'}
                    message={'Please search again or go back to the home page'}
                    icon={<RiFileWarningLine />} btnText={'Go Home'}
                    btnIcon={<RiHome2Fill />} route={'/'}
                    height={'calc(100vh - 6em)'} />
                :
                    <ItemDetail {...item} />
                }
            </div>
        </div>
    )
}

export default ItemDetailContainer