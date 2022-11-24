import { useEffect, useState } from 'react'
import { RiArrowDropLeftLine, RiPencilFill } from 'react-icons/ri'
import { getItemFID, getItems } from '../../firebase/client'
import { motion, AnimatePresence } from 'framer-motion'
import '../../scss/edit.scss'
import Spinner from './Spinner'

const Edit = () => {
    const [items, setItems] = useState(undefined)
    const [item, setItem] = useState(null)
    const [colorList, setColorList] = useState(null)
    const platformList = [
        {
            id: 'switch',
            name: 'Switch',
            platform: 'nintendo'
        },
        {
            id: 'ps4',
            name: 'PS4',
            platform: 'playstation'
        },
        {
            id: 'xone',
            name: 'Xbox One',
            platform: 'xbox'
        },
        {
            id: 'ps5',
            name: 'PS5',
            platform: 'playstation'
        },
        {
            id: 'xseries',
            name: 'Xbox Series',
            platform: 'xbox'
        },
        {
            id: '3ds',
            name: '3DS',
            platform: 'nintendo'
        },
        {
            id: 'pc',
            name: 'PC',
            platform: 'pc'
        }
    ]
    const categoryList = [
        {
            id: 'console',
            name: 'Console'
        },
        {
            id: 'game',
            name: 'Game'
        },
        {
            id: 'accesory',
            name: 'Accesory'
        }
    ]

    useEffect(() => {
        getItems().then(setItems)
    }, [])

    const handleEdit = id => {
        const findItem = [items.find(x => x.id == id)]
        const colorVariants = items.find(x => id == id)?.colors

        if (colorVariants) {
            Promise.all(
                colorVariants.map(({ id }) => {
                    return new Promise(res => {
                        getItemFID(id)
                        .then(data => {
                            return res({
                                id,
                                ...data
                            })
                        })
                    })
                })
            ).then(allColors => {
                setColorList(allColors)
                setItem(findItem)
            })
        } else {
            setItem(findItem)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    return (
        <div className="edit">
            <h2>Edit</h2>
            <div className="itemsWrapper">
                {items === undefined &&
                    <Spinner />
                }
                <AnimatePresence initial={false} mode='wait'>
                    {!item ?
                        <motion.div key={'itemList'} className="itemList" initial={{x: '-120%'}}
                        animate={{x: 0}} exit={{x: '-120%'}}
                        transition={{duration: 0.2, damping: 25, stiffness: 300, type: 'spring'}}>
                            {items &&
                                items.map(({id, title, price, pic}) => {
                                    return (
                                        <div key={id} className="item">
                                            <div className="pic">
                                                <img src={pic} />
                                            </div>
                                            <div className="info">
                                                <div className="title">
                                                    {title}
                                                </div>
                                                <div className="price">
                                                    ${price}
                                                </div>
                                            </div>
                                            <div className="edit" onClick={() => handleEdit(id)}>
                                                <RiPencilFill />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </motion.div>
                    :
                        <motion.div key={'itemEdit'} className="itemEdit" initial={{x: '120%'}}
                        animate={{x: 0}} exit={{x: '120%'}}
                        transition={{duration: 0.2, damping: 25, stiffness: 300, type: 'spring'}}>
                            <div className="topBar">
                                <div className="wrapper" onClick={() => setItem(null)}>
                                    <div className="icon">
                                        <RiArrowDropLeftLine />
                                    </div>
                                    <div className="infoTitle">
                                        Go back
                                    </div>
                                </div>
                            </div>
                            <div className="content">
                                {item.map(({ id, title, price, stock, pic, description, categories, colors = null }) => {
                                    return (
                                        <form key={id} onSubmit={handleSubmit}>
                                            <div className="left">
                                                <div className="pic">
                                                    <img src={pic} />
                                                </div>
                                                {colors &&
                                                    <div className="colors">
                                                        {colors.map(({id: colorId, color}) => {
                                                            return (
                                                                <div className={colorId == id ? 'color active' : 'color'}
                                                                key={colorId} style={{backgroundColor: color}}>
                                                                    <input type="color" defaultValue={color} />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                }
                                            </div>
                                            <div className="middle">
                                                <input type="text" name='title' defaultValue={title}
                                                className='inputTitle' placeholder='Title' />
                                                <input type="text" name='price' defaultValue={price}
                                                className='inputPrice' placeholder='Price' />
                                                <input type="text" name='stock' defaultValue={stock}
                                                className='inputStock' placeholder='Stock' />
                                                <textarea name="description" className='description'
                                                placeholder='Description'>
                                                    {description}
                                                </textarea>
                                            </div>
                                            <div className="right">
                                                <div className="platforms">
                                                    <span>Platforms</span>
                                                    {platformList.map(({id, name, platform}) => {
                                                        return (
                                                            <div key={id} className="platform">
                                                                <input type="radio" name='platform' id={id}
                                                                defaultChecked={categories.includes(id)} />
                                                                <label htmlFor={id}>{name}</label>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div className="categoryList">
                                                    <span>Categories</span>
                                                    {categoryList.map(({id, name}) => {
                                                        return (
                                                            <div key={id} className="cat">
                                                                <input type="radio" name='cat' id={id}
                                                                defaultChecked={categories.includes(id)} />
                                                                <label htmlFor={id}>{name}</label>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </form>
                                    )    
                                })}
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Edit