import '../../scss/listContainer.scss'

const ItemListContainer = ({ greeting }) => {
    return (
        <div className="message">
            <h1>{greeting}</h1>
        </div>
    )
}

export default ItemListContainer