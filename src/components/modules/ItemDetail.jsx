import ItemCount from './ItemCount'
import '../../scss/detail.scss'
import { useState } from 'react'
import { useEffect } from 'react'

const ItemDetail = ({ id, title, pic, price, stock, description }) => {
    const [[x, y], setXY] = useState([0, 0])

    const handleMouseMove = e => {
        const rect = e.currentTarget.getBoundingClientRect()
        const { top, left } = rect
        const x = Math.round((e.pageX - left - window.scrollX))
        const y = Math.round((e.pageY - top - window.scrollY))

        setXY([-x, -y])
    }

    return (
        <div className="detail">
            <div className="preview">
                <div className="pic" onMouseMove={handleMouseMove}>
                    <img src={pic} alt={title} />
                </div>
                <div className="magnified">
                    <img src={pic} style={{objectPosition: `${x}px ${y}px`}} />
                </div>
            </div>
            <div className="info">
                <div className="title">
                    <h2>{title}</h2>
                </div>
                <div className="description">
                    <span>{description}</span>
                </div>
                <div className="price">
                    <span>${price}</span>
                </div>
                <div className="buy">
                    <ItemCount stock={stock} id={id} />
                </div>
            </div>
        </div>
    )
}

export default ItemDetail