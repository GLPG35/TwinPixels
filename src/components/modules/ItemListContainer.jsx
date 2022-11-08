import ItemList from './ItemList'
import '../../scss/listContainer.scss'

const ItemListContainer = (props) => {
    return (
        <div className="products">
            <ItemList {...props} />
        </div>
    )
}

export default ItemListContainer