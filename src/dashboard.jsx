import { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { globalContext } from './App'
import Spinner from './components/modules/Spinner'
import './scss/dashboard.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { RiSettings3Fill, RiAddBoxFill, RiDeleteBinFill, RiEdit2Fill, RiUserLine, RiArrowDropRightLine, RiArrowDropLeftLine, RiSave2Fill, RiStackFill } from 'react-icons/ri'
import Create from './components/modules/Create'
import Edit from './components/modules/Edit'
import Delete from './components/modules/Delete'
import { checkUser, updateUser, uploadPFP } from './firebase/client'
import { getDownloadURL } from 'firebase/storage'
import Stock from './components/modules/Stock'

const Dashboard = () => {
    const { user } = useContext(globalContext)
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const actions = [
        {
            name: 'create',
            component: <Create key={'create'} />
        },
        {
            name: 'edit',
            component: <Edit key={'edit'} />
        },
        {
            name: 'delete',
            component: <Delete key={'delete'} />
        },
        {
            name: 'stock',
            component: <Stock key={'stock'} />
        }
    ]
    const action = actions.find(x => x.name == params.get('action')) ?? { name: 'create', component: <Create key={'create'} />}
    const [showOp, setShowOp] = useState(false)
    const [settings, setSettings] = useState(false)
    const [settingsOp, setSettingsOp] = useState(null)
    const settingsOptions = [
        {
            name: 'profilePic',
            component: <ProfilePic key={'profilePic'} />
        },
        {
            name: 'username',
            component: <Username key={'username'} />
        }
    ]
    const profile = useRef()

    useEffect(() => {
        user === null && navigate('/login')
    }, [user])

    useEffect(() => {
        const handleOutside = e => {
            if ((profile.current && !profile.current.contains(e.target))) {
                setShowOp(false)
            }
        }

        if (user) {
            document.addEventListener('click', handleOutside, { capture: true })
        }

        return () => {
            document.removeEventListener('click', handleOutside, { capture: true })
        }
    }, [showOp])

    return (
        <div className="dashboard" >
            <div className="container1">
                <AnimatePresence>
                    {!user && <Spinner />}
                    {user && settings &&
                        <motion.div className="settingsContainer" onClick={() => setSettings(false)}
                        initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                            <motion.div className="settingsWrapper" onClick={e => e.stopPropagation()}
                                initial={{opacity: 0, scale: 0.5}} animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0}} transition={{delay: 0.2}}>
                                <motion.div className="settings">
                                    <AnimatePresence>
                                        {settingsOp &&
                                            <motion.button className='back' onClick={() => setSettingsOp(null)}
                                            initial={{opacity: 0, scale: 0, x: 'calc(-100% - 0.5em)'}}
                                            animate={{opacity: 1, scale: 1, x: 'calc(-100% - 0.5em)'}}
                                            exit={{opacity: 0, scale: 0, x: 'calc(-100% - 0.5em)'}}>
                                                <RiArrowDropLeftLine />
                                            </motion.button>
                                        }
                                    </AnimatePresence>
                                    <div className="topBar">
                                        <div className="pic">
                                            {user.photoURL ?
                                                <img src={user.photoURL} />
                                            :
                                                <img src={`https://ui-avatars.com/api/?name=${user.displayName}&background=1a112e&color=f45d92&size=48`} />
                                            }
                                        </div>
                                        <div className="userName">
                                            <div className="icon">
                                                <RiUserLine />
                                            </div>
                                            <span>{user.displayName}</span>
                                        </div>
                                    </div>
                                    <div className="content">
                                        <AnimatePresence initial={false}>
                                            {!settingsOp ?
                                                <motion.div className="options"
                                                initial={{x: '-120%'}} animate={{x: 0}}
                                                exit={{x: '-120%'}}>
                                                    <div className="op">
                                                        <span className="name">
                                                            Change profile picture
                                                        </span>
                                                        <button onClick={() => setSettingsOp('profilePic')}>
                                                            <div className="icon">
                                                                <RiArrowDropRightLine />
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div className="op">
                                                        <span className="name">
                                                            Change Username
                                                        </span>
                                                        <button onClick={() => setSettingsOp('username')}>
                                                            <div className="icon">
                                                                <RiArrowDropRightLine />
                                                            </div>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            :
                                                settingsOptions.map(x => x.name == settingsOp && x.component)
                                            }
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                                <div className="shadow"></div>
                            </motion.div>
                        </motion.div>
                    }
                </AnimatePresence>
                {user &&
                    <>
                        <div className="sideBar">
                            <div className="profile" ref={profile}>
                                <div className="top">
                                    <motion.div className="pic" onClick={() => setShowOp(!showOp)}
                                    whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}>
                                        {user.photoURL ?
                                            <img src={user.photoURL} />
                                        :
                                            <img src={`https://ui-avatars.com/api/?name=${user.displayName}&background=1a112e&color=f45d92&size=48`} />
                                        }
                                    </motion.div>
                                    <div className="name">
                                        {user.displayName}
                                    </div>
                                </div>
                                <AnimatePresence>
                                    {showOp &&
                                        <motion.div className='profileOpWrapper'
                                        initial={{opacity: 0, translateX: -50}}
                                        animate={{opacity: 1, translateX: 0}}
                                        exit={{opacity: 0}}>
                                            <div className="profileOptions" onClick={() => {setSettings(true), setShowOp(false)}}>
                                                <RiSettings3Fill/>
                                                Settings
                                            </div>
                                            <div className="profileShadow">
                                                <RiSettings3Fill/>
                                                Settings
                                            </div>
                                        </motion.div>
                                    }
                                </AnimatePresence>
                                <div className="sections">
                                    <div className={action.name == 'create' ? 'op active' : 'op'}
                                    onClick={() => navigate('/dashboard?action=create')}>
                                        <RiAddBoxFill /> Create
                                    </div>
                                    <div className={action.name == 'stock' ? 'op active' : 'op'}
                                    onClick={() => navigate('/dashboard?action=stock')}>
                                        <RiStackFill /> Stock
                                    </div>
                                    <div className={action.name == 'edit' ? 'op active' : 'op'}
                                    onClick={() => navigate('/dashboard?action=edit')}>
                                        <RiEdit2Fill /> Edit
                                    </div>
                                    <div className={action.name == 'delete' ? 'op active' : 'op'}
                                    onClick={() => navigate('/dashboard?action=delete')}>
                                        <RiDeleteBinFill /> Delete
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mainContent">
                            {actions.map(({name, component}) => name == action.name && component)}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

const ProfilePic = () => {
    const [uploading, setUploading] = useState(false)
    const { user, setUser } = useContext(globalContext)

    const handleDragEnter = e => {
        const element = e.target
        element.classList.add('drag')
    }

    const handleDragLeave = e => {
        const element = e.target
        element.classList.remove('drag')
    }

    const handleDragOver = e => {
        e.stopPropagation()
        e.preventDefault()
    }

    const convertImg = img => {
        URL.revokeObjectURL(img.src)
        const name = new Date().getTime().toString() + (Math.random() + 1).toString(36).substring(10)

        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        canvas.width = img.width > img.height ? img.height : img.width
        canvas.height = canvas.width
        context.drawImage(img, 0, 0)

        canvas.toBlob(blob => {
            const task = uploadPFP(new File([blob], name))
            
            task.on('state_changed',
                () => {
                    setUploading(true)
                },
                (err) => {
                },
                () => {
                    getDownloadURL(task.snapshot.ref)
                    .then(pic => {
                        updateUser({ photoURL: pic })
                        .then(() => {
                            checkUser(setUser)
                            setUploading(false)
                        })
                    })
                }
            )
        }, 'image/jpeg', 0.6)
    }

    const handleDrop = e => {
        e.preventDefault()

        const element = e.target
        element.classList.remove('drag')

        if (e.dataTransfer.files) {
            const file = e.dataTransfer.files[0]
            const img = new Image()
            img.src = URL.createObjectURL(file)
            img.addEventListener('load', () => convertImg(img))
        }
    }

    return (
        <motion.div initial={{x: '120%'}} animate={{x: 0}} exit={{x: '120%'}}
        className="detailedOp profilePic">
            <div className="pic" onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}
            onDragOver={handleDragOver} onDrop={handleDrop}>
                <AnimatePresence>
                    {uploading && <Spinner />}
                </AnimatePresence>
                {user.photoURL ?
                    <img src={user.photoURL} />
                :
                    <img src={`https://ui-avatars.com/api/?name=${user.displayName}&background=1a112e&color=f45d92&size=48`} />
                }
            </div>
        </motion.div>
    )
}

const Username = () => {
    const { setUser } = useContext(globalContext)
    const [updating, setUpdating] = useState(false)

    const handleUsername = e => {
        e.preventDefault()
        const { username: { value: username } } = e.target

        setUpdating(true)

        updateUser({displayName: username})
        .then(() => {
            checkUser(setUser)
            setUpdating(false)
        })
    }
    
    return (
        <motion.div initial={{x: '120%'}} animate={{x: 0}} exit={{x: '120%'}}
        className="detailedOp username">
            <form onSubmit={handleUsername}>
                <AnimatePresence>
                    {updating && <Spinner />}
                </AnimatePresence>
                <input type="text" name='username' placeholder='Username' required />
                <div className="button">
                    <button type='submit'>
                        <div className="icon">
                            <RiSave2Fill />
                        </div>
                        Save
                    </button>
                </div>
            </form>
        </motion.div>
    )
}

export default Dashboard