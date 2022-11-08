import { useParams, useSearchParams } from 'react-router-dom'
import itemList from './db/items.json'
import ItemListContainer from './components/modules/ItemListContainer'
import './scss/category.scss'

const Category = () => {
    const { id } = useParams()
    const [params] = useSearchParams()
    const platform = params.get('platform')

    return (
        <div className="category">
            <div className="container1">
                <div className="title">
                    <h2>{platform} {id}</h2>
                </div>
                <ItemListContainer items={itemList} categoryList={[id, platform]} />
            </div>
        </div>
    )
}

export default Category