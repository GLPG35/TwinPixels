import ItemList from './ItemList'
import '../../scss/listContainer.scss'
import { AnimatePresence } from 'framer-motion'
import PlaceholderContainer from './PlaceholderContainer'

const ItemListContainer = ({ items, categoryList, search = null }) => {
    return (
        <AnimatePresence>
            {items === undefined ?
                <PlaceholderContainer />
            :
                <div className="products">
                    <ItemList items={items} categoryList={categoryList} search={search} />
                </div>
            }
        </AnimatePresence>
    )
}

export default ItemListContainer