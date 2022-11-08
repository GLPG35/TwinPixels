import Item from './Item'

const ItemList = ({ items, categoryList }) => {
    return (
        items.map(({id, title, price, pic, categories}) => {
            const filter = categoryList.every(cat => categories.includes(cat))

            console.log(filter)

            if (filter) {
                return (
                    <Item key={id} id={id} title={title} price={price} pic={pic} />
                )
            }
        })
    )
}

export default ItemList