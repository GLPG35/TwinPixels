import { getItemFID } from '../firebase/client'

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
            quantity: Number(quant)
        }
    }

    return new Promise((res, rej) => {
        if (exists) {
            const newCart = cartList.map(x => x.id == id ? { ...x, quantity: Number(x.quantity) + Number(quant) } : x)
            localStorage.setItem('cart', JSON.stringify(newCart))
            res()
        } else {
            return getItemFID(id).then(item => {
                const newItem = mapItems(item)
                cartList.push(newItem)
                localStorage.setItem('cart', JSON.stringify(cartList))
                res()
            })
        }
    })
}

export default useAddToCart