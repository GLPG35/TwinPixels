import ItemCount from './ItemCount'
import '../../scss/detail.scss'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import imgPlaceholder from '/Image_Placeholder.webp'
import { useNavigate } from 'react-router-dom'

const ItemDetail = ({ id, title, pic, price, stock, description, colors = null }) => {
    const [[x, y], setXY] = useState([0, 0])
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

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
                    <AnimatePresence>
                        {!loaded &&
                            <motion.img src={imgPlaceholder} className='placeholder'
                            initial={{opacity: 1}} animate={{opacity: 1}} exit={{opacity: 0}} />
                        }
                    </AnimatePresence>
                    <img loading='lazy' className={loaded ? 'ready' : undefined}
                    src={pic} alt={title}
                    onLoad={() => setLoaded(true)} />
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
                {colors &&
                    <div className="colors">
                        {colors.map(({ id: colorId, color }) => {
                            return (
                                <div key={colorId}
                                className={id == colorId ? 'color active' : 'color'}
                                style={{backgroundColor: color}}
                                onClick={() => navigate(`/item/${colorId}`)}>
                                </div>
                            )    
                        })}
                    </div>
                }
                <div className="buy">
                    <ItemCount stock={stock} id={id} />
                </div>
            </div>
        </div>
    )
}

export default ItemDetail