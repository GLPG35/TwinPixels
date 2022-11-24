import { useState, useEffect, useRef } from 'react'
import { RiCheckboxMultipleFill, RiDragDropFill, RiUploadCloud2Line, RiAddFill, RiSubtractFill } from 'react-icons/ri'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { uploadItem, addItemColors, uploadThumb } from '../../firebase/client'
import { getDownloadURL } from 'firebase/storage'
import Spinner from './Spinner'
import '../../scss/create.scss'

const Create = () => {
    const [markedOp, setMarkedOp] = useState([])
    const [activeTab, setActiveTab] = useState('')
    const [images, setImages] = useState([])
    const [finished, setFinished] = useState(0)
    const [color, setColor] = useState(false)
    const [colors, setColors] = useState([{
        id: 1, color: '#f0f0f0', pic: null, price: undefined, stock: undefined, description: undefined
    },
    {
        id: 2, color: '#f0f0f0', pic: null, price: undefined, stock: undefined, description: undefined
    }])
    const [selectedColor, setSelectedColor] = useState(1)
    const inputPic = useRef()
    const options = [
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

    const handleChange = (e, id, name, platform) => {
        const currentChecked = [...markedOp]
        const isChecked = e.target.checked

        if (isChecked) {
            setMarkedOp(prev => [...prev, { id, name, platform }])
            setActiveTab(id)
        } else {
            const findChecked = currentChecked.findIndex(x => x.id == id)

            images.forEach(({id}) => {
                const findImage = markedOp.findIndex(x => x.id == id)
    
                if (findImage != -1) {
                    const newImages = [...images]
                    newImages.splice(findImage, 1)
                    setImages(newImages)
                }
            })

            if (activeTab == id) {
                const nextTab = markedOp[findChecked + 1] || markedOp[findChecked - 1] || ''
                setActiveTab(nextTab.id)
            }

            if (findChecked != -1) {
                currentChecked.splice(findChecked, 1)
                setMarkedOp(currentChecked)
            }
        }

        if (markedOp.length > 1 && color) {
            setColor(false)
        }
    }

    const handleDragEnter = e => {
        const element = e.target
        element.classList.add('dragOver')
    }

    const handleDragLeave = e => {
        const element = e.target
        element.classList.remove('dragOver')
    }

    const handleDragOver = e => {
        e.stopPropagation()
        e.preventDefault()
    }

    const convertImage = (img, id, findImage) => {
        URL.revokeObjectURL(img.src)

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        canvas.width = img.width > img.height ? img.width : img.height
        canvas.height = img.height > img.width ? img.height : img.width
        context.drawImage(img,
            img.width < img.height ? canvas.width / 2 - img.width / 2 : 0,
            img.height < img.width ? canvas.height / 2 - img.height / 2 : 0)
        
        context.globalCompositeOperation = 'destination-over'
        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, img.width > img.height ? img.width : img.height,
            img.height > img.width ? img.height : img.width)

        canvas.toBlob(blob => {
            if (!color) {
                if (findImage != -1) {
                    const currentImages = [...images]
                    currentImages.splice(findImage, 1)
                    setImages(currentImages)
                    setImages(prev => [...prev, { id, pic: new File([blob], img.name) }])
                } else {
                    setImages(prev => [...prev, { id, pic: new File([blob], img.name) }])
                }
            } else {
                const colorsCopy = [...colors]
                const colorCopy = colorsCopy.find(x => x.id == id)
                colorsCopy.splice(findImage, 1, { ...colorCopy, pic: new File([blob], img.name) })
                setColors(colorsCopy)
            }
        }, 'image/jpeg', 0.6)
    }

    const handleDrop = (e, id) => {
        e.preventDefault()
        
        const element = e.target
        element.classList.remove('dragOver')

        if (e.dataTransfer.files) {
            const file = e.dataTransfer.files[0]
            const findImage = !color ? images.findIndex(x => x.id == id) :
                colors.findIndex(x => x.id == selectedColor)
            const img = new Image()
            img.src = URL.createObjectURL(file)
            img.name = file.name.split('.')[0]
            img.addEventListener('load', () => convertImage(img, !color ? id : selectedColor, findImage))
        }
    }

    const handleFileUp = id => {
        const file = inputPic.current.files[0]
        const findImage = !color ? images.findIndex(x => x.id == id) :
            colors.findIndex(x => x.id == selectedColor)
        const img = new Image()
        img.src = URL.createObjectURL(file)
        img.name = file.name.split('.')[0]
        img.addEventListener('load', () => convertImage(img, !color ? id : selectedColor, findImage))
    }

    const handleColorCheck = e => {
        const isChecked = e.currentTarget.checked
        setColor(isChecked)

        if (images.find(x => x.pic)) {
            const { pic } = images.find(x => x.pic)

            const currentColors = [...colors]
            const firstColor = currentColors.find(x => x.id == 1)
            currentColors.splice(0, 1, { ...firstColor, pic })
            
            setColors(currentColors)
        }
    }

    const handleColors = (e, id) => {
        const findColor = colors.findIndex(x => x.id == id)
        const color = e.currentTarget.value

        const colorsCopy = [...colors]
        const currentColor = colorsCopy.find(x => x.id == id)
        colorsCopy.splice(findColor, 1, { ...currentColor, color })
        setColors(colorsCopy)
    }

    const addColor = id => {
        setColors(prev => [...prev, {
            id,
            color: '#f0f0f0',
            pic: null,
            price: undefined,
            stock: undefined,
            description: undefined
        }])
        setSelectedColor(id)
    }

    const removeColor = () => {
        if (colors.length > 2) {
            const currentIndex = colors.findIndex(x => x.id == selectedColor)

            if (currentIndex == colors.length - 1) {
                setSelectedColor(prev => Number(prev) - 1)
            }

            const colorsCopy = [...colors]
            colorsCopy.pop()

            setColors(colorsCopy)
        }
    }

    const handlePriceChange = (e, id) => {
        if (!color) {
            e.currentTarget.value == e.currentTarget.value
            return
        }

        const { value: price } = e.currentTarget

        const findColor = colors.findIndex(x => x.id == id)
        const colorsCopy = [...colors]
        const colorCopy = colors.find(x => x.id == id)
        colorsCopy.splice(findColor, 1, { ...colorCopy, price })
        setColors(colorsCopy)
    }

    const handleStockChange = (e, id) => {
        if (!color) {
            e.currentTarget.value == e.currentTarget.value
            return
        }

        const { value: stock } = e.currentTarget

        const findColor = colors.findIndex(x => x.id == id)
        const colorsCopy = [...colors]
        const colorCopy = colors.find(x => x.id == id)
        colorsCopy.splice(findColor, 1, { ...colorCopy, stock })
        setColors(colorsCopy)
    }

    const handleDescChange = (e, id) => {
        if (!color) {
            e.currentTarget.value == e.currentTarget.value
            return
        }

        const { value: description } = e.currentTarget

        const findColor = colors.findIndex(x => x.id == id)
        const colorsCopy = [...colors]
        const colorCopy = colors.find(x => x.id == id)
        colorsCopy.splice(findColor, 1, { ...colorCopy, description })
        setColors(colorsCopy)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { title: { value: title }, price,
        stock, description, category: { value: category } } = e.target

        if (!color) {
            if (markedOp.length && images.length == markedOp.length) {
                setFinished(markedOp.length)

                markedOp.forEach(({id, platform}) => {
                    const findImage = images.find(x => x.id == id)
                    const { pic: img } = findImage
                    const { value: findPrice } = markedOp.length > 1 ? Array.from(price).find(x => x.id == id) : price
                    const { value: findStock } = markedOp.length > 1 ? Array.from(stock).find(x => x.id == id) : stock
                    const { value: findDesc } = markedOp.length > 1 ? Array.from(description).find(x => x.id == id) : description
    
                    const task = uploadThumb(img)
    
                    task.on('state_changed',
                        () => {
                        },
                        (err) => {
                        },
                        () => {
                            getDownloadURL(task.snapshot.ref)
                            .then(pic => {
                                const newItem = {
                                    title,
                                    price: Number(findPrice),
                                    stock: Number(findStock),
                                    pic,
                                    description: findDesc || null,
                                    categories: [
                                        id,
                                        platform,
                                        category
                                    ]
                                }
    
                                uploadItem(newItem)
                                .then(() => {
                                    setFinished(prev => Number(prev) - 1)
                                })
                            })
                        }
                    )
                })
            }
        } else {
            const notImage = colors.find(x => x.pic == null)
            const { id, platform } = markedOp[0]

            if (!notImage) {
                setFinished(true)

                Promise.all(
                    colors.map(({ color, pic, price, stock, description }) => {
                        return new Promise((res, rej) => {
                            const task = uploadThumb(pic)

                            task.on('state_changed',
                                () => {
                                },
                                (err) => {
                                    return rej(err)
                                },
                                () => {
                                    getDownloadURL(task.snapshot.ref)
                                    .then(img => {
                                        const newItem = {
                                            title,
                                            price: Number(price),
                                            stock: Number(stock),
                                            pic: img,
                                            description: description || null,
                                            categories: [
                                                id,
                                                platform,
                                                category
                                            ]
                                        }

                                        return uploadItem(newItem)
                                        .then(data => {
                                            return res({ id: data.id, color })
                                        })
                                    })
                                }
                            )
                        })
                    })
                ).then(totalItems => {
                    Promise.all(
                        totalItems.map(({ id }) => {
                            return new Promise(res => {
                                addItemColors(id, totalItems)
                                .then(() => {
                                    return res()
                                })
                            })
                        })
                    ).then(() => {
                        setFinished(false)
                    })
                })
            }
        }
    }

    return (
        <div className="create">
            <AnimatePresence>
                {finished != 0 && <Spinner />}
            </AnimatePresence>
            <h2>Create</h2>
            <form onSubmit={handleSubmit}>
                <div className="left">
                    <input type="text" placeholder='Title' name='title' className='title' required />
                    <div className="labels">
                        <div className="platforms">
                            <span>Platforms</span>
                            {options.map(({name, id, platform}) => {
                                return (
                                    <div key={id} className={`platform ${id}`}>
                                        <input type="checkbox" name={id} id={id}
                                        onChange={e => handleChange(e, id, name, platform)} />
                                        <label htmlFor={id}>{name}</label>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="category">
                            <span>Category</span>
                            <div className="cat">
                                <input type="radio" name='category' id='console' value='console' required />
                                <label htmlFor='console'>Console</label>
                            </div>
                            <div className="cat">
                                <input type="radio" name='category' id='game' value='game' />
                                <label htmlFor='game'>Game</label>
                            </div>
                            <div className="cat">
                                <input type="radio" name='category' id='accesory' value='accesory' />
                                <label htmlFor='accesory'>Accesory</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    {!markedOp.length ?
                        <div className="noMarked">
                            <div className="icon">
                                <RiCheckboxMultipleFill />
                            </div>
                            <span>Mark any console to upload an image.</span>
                        </div>
                    :
                        <div className="pics">
                            <div className="tabs">
                                {markedOp.map(({id, name}) => {
                                    return (
                                        <div key={id} className={activeTab == id ? 'tab active' : 'tab'}
                                        onClick={() => setActiveTab(id)}>
                                            {name}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="imageUp">
                                {markedOp.map(({id}) => {
                                    return (
                                        <div key={id} className={activeTab == id ? 'console active' : 'console'}>
                                            <div className="imgWrapper">
                                                {activeTab == id && 
                                                    <input type="file" name='pic' ref={inputPic}
                                                    onChange={() => handleFileUp(id)} />
                                                }
                                                <button type='button' onClick={() => inputPic.current.click()}>
                                                    Upload Picture (1:1)
                                                </button>
                                                <div className="imgPreview" onDragEnter={handleDragEnter}
                                                onDragLeave={handleDragLeave} onDragOver={handleDragOver}
                                                onDrop={e => handleDrop(e, id)}>
                                                    {!color ?
                                                        !images.find(x => x.id == id) ?
                                                            <>
                                                                <div className="icon">
                                                                    <RiDragDropFill />
                                                                </div>
                                                                <span>
                                                                    Or drop your picture here
                                                                </span>
                                                            </>
                                                        :
                                                            <img src={URL.createObjectURL(images.find(x => x.id == id).pic)} />
                                                    : !colors.find(x => x.id == selectedColor).pic ?
                                                        <>
                                                            <div className="icon">
                                                                <RiDragDropFill />
                                                            </div>
                                                            <span>
                                                                Or drop your picture here
                                                            </span>
                                                        </>
                                                    :
                                                        <img src={URL.createObjectURL(colors.find(x => x.id == selectedColor).pic)} />
                                                    }
                                                </div>
                                            </div>
                                            {!color ?
                                                <div className="inputWrapper">
                                                    <input type="number" placeholder='Price' name='price' className='price'
                                                    min='1' max='9999' required id={id} />
                                                    <input type="number" placeholder='Stock' name='stock' className='stock'
                                                    min='1' max='9999' required id={id} />
                                                    <textarea placeholder='Description' name='description' className='description'
                                                    id={id}>
                                                    </textarea>
                                                </div>
                                            :
                                                <div className="inputWrapper">
                                                    {colors.map(({id, price, stock, description}) => {
                                                        return (
                                                            <div className={id == selectedColor ? 'inputGroup active' : 'inputGroup'}
                                                            key={id}>
                                                                <input type="number" placeholder='Price' name='price'
                                                                className='price' min='1' max='9999' required
                                                                value={price}
                                                                onChange={e => handlePriceChange(e, id)} />
                                                                <input type="number" placeholder='Stock' name='stock'
                                                                className='stock' min='1' max='9999' required
                                                                value={stock}
                                                                onChange={e => handleStockChange(e, id)} />
                                                                <textarea placeholder='Description' name='description'
                                                                className='description'
                                                                onChange={e => handleDescChange(e, id)}>
                                                                    {description}
                                                                </textarea>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            }
                                            {markedOp.length == 1 &&
                                                <div className="colorPicker">
                                                    <div className="setColors">
                                                        <input type="checkbox" id='hasColor' name='hasColor' className='hasColor'
                                                        onChange={handleColorCheck}
                                                        checked={color} />
                                                        <label htmlFor="hasColor">Colors</label>
                                                    </div>
                                                    <AnimatePresence>
                                                        {color &&
                                                            <motion.div layout className="colors" initial={{opacity: 0}}
                                                            animate={{opacity: 1}} exit={{opacity: 0}}
                                                            transition={{duration: 0.2}}>
                                                                <LayoutGroup>
                                                                    <AnimatePresence>
                                                                        {colors.map(({ id, color }) => {
                                                                            return (
                                                                                <motion.div layout='position'
                                                                                className={selectedColor == id ?
                                                                                'color active' : 'color'}
                                                                                key={id} style={{backgroundColor: color }}
                                                                                initial={{scale: 0}} animate={{scale: 1}}
                                                                                exit={{scale: 0}}>
                                                                                    <input type="color"
                                                                                    onChange={e => handleColors(e, id)}
                                                                                    onClick={() => setSelectedColor(id)} />
                                                                                </motion.div>
                                                                            )
                                                                        })}
                                                                    </AnimatePresence>
                                                                    <motion.div className="actions" layout
                                                                    initial={{opacity: 0}} animate={{opacity: 1}}
                                                                    exit={{opacity: 0}} transition={{duration: 0.2, type: 'spring'}}>
                                                                        <AnimatePresence>
                                                                            {colors.length > 2 &&
                                                                                <motion.div layout className="removeColor"
                                                                                initial={{scale: 0}} animate={{scale: 1}}
                                                                                exit={{scale: 0}} key='remove'
                                                                                onClick={() => removeColor()}>
                                                                                    <RiSubtractFill />
                                                                                </motion.div>
                                                                            }
                                                                            <motion.div className="addColor" layout
                                                                            onClick={() => addColor(colors.length + 1)}
                                                                            key='add'>
                                                                                <RiAddFill />
                                                                            </motion.div>
                                                                        </AnimatePresence>
                                                                    </motion.div>
                                                                </LayoutGroup>
                                                            </motion.div>
                                                        }
                                                    </AnimatePresence>
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                </div>
                <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                type='submit' className='submit'>
                    <RiUploadCloud2Line />
                    Upload Products
                </motion.button>
            </form>
        </div>
    )
}

export default Create