import Item from './Item'

const ItemList = ({ items, categoryList = null, search }) => {
    return (
        <>
            {categoryList ?
                items.map(({id, title, price, pic, categories, stock}) => {
                    const filter = categoryList.every(cat => categories.includes(cat))
        
                    if (filter) {
                        return (
                            <Item key={id} id={id} title={title} price={price} pic={pic} stock={stock} />
                        )
                    }
                })
            : search &&
                items.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
                .map(({id, title, price, pic, stock}) => {
                    return (
                        <Item key={id} id={id} title={title} price={price} pic={pic} stock={stock} />
                    )
                })
            }
        </>
    )
}

export default ItemList