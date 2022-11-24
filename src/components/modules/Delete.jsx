import { useEffect, useState } from 'react'
import { deleteItem, getItems } from '../../firebase/client'
import Spinner from './Spinner'
import '../../scss/delete.scss'
import { RiDeleteBinFill } from 'react-icons/ri'
import { AnimatePresence, motion } from 'framer-motion'
import Modal from './Modal'

const Delete = () => {
    const [items, setItems] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    
    useEffect(() => {
        !items && getItems().then(setItems)
    }, [])

    const handleConfirm = id => {
        deleteItem(id).then(() => {
            setSelectedItem(null)
            getItems().then(setItems)
        })
    }

    return (
        <div className="delete">
            <h2>Delete</h2>
            <div className="deleteWrapper">
                {!items ?
                    <Spinner />
                :
                    <>
                        <AnimatePresence>
                            {selectedItem &&
                                <Modal message='Are you sure to delete this item?'
                                handleClose={() => setSelectedItem(null)} id={selectedItem}
                                handleConfirm={handleConfirm} />
                            }
                        </AnimatePresence>
                        <div className="itemList">
                            {items.map(({ id, title, pic, categories }) => {
                                return (
                                    <motion.div className="item" key={id}
                                    layoutId={id}>
                                        <div className="pic">
                                            <img src={pic} />
                                        </div>
                                        <div className="content">
                                            <div className="title">
                                                {title}
                                            </div>
                                            <div className="categoryList">
                                                {categories.map((el, index) => {
                                                    return (
                                                        <div key={index} className="categoryEl">
                                                            {el}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className="delete" onClick={() => setSelectedItem(id)}>
                                            <RiDeleteBinFill />
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Delete