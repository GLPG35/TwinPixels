import itemList from '../db/items.json'

const useAddToCart = (id, quant = 1) => {
    const cartList = JSON.parse(localStorage.getItem('cart')) || []
    const exists = cartList.find(x => x.id == id)

    const mapItems = (item) => {
        const { id, title, price, pic } = item

        return {
            id,
            title,
            price,
            pic,
            quantity: quant
        }
    }

    if (exists) {
        const newCart = cartList.map(x => x.id == id ? { ...x, quantity: x.quantity + quant } : x)
        localStorage.setItem('cart', JSON.stringify(newCart))
    } else {
        const findItem = itemList.find(x => x.id == id)
        const newItem = mapItems(findItem)
        cartList.push(newItem)
        localStorage.setItem('cart', JSON.stringify(cartList))
    }
}

export default useAddToCart