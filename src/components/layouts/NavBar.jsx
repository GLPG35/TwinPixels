import { NavLink } from 'react-router-dom'
import { RiUserLine, RiSearchLine, RiDashboardFill, RiLogoutBoxLine } from 'react-icons/ri'
import '../../scss/header.scss'
import { useRef, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CartWidget from '../modules/CartWidget'
import { globalContext } from '../../App'
import { checkUser, logOut } from '../../firebase/client'
import SearchList from '../modules/SearchList'

const NavBar = ({ handleSearch, search, setSearch }) => {
    const { user, setUser } = useContext(globalContext)
    const [profileOp, setProfileOp] = useState(false)
    const searchInput = useRef()
    const profile = useRef()

    useEffect(() => {
        const handleOutside = e => {
            if ((profile.current && !profile.current.contains(e.target))) {
                setProfileOp(false)
            }
        }
        
        if (user) {
            document.addEventListener('click', handleOutside, { capture: true })
        }

        return () => {
            document.removeEventListener('click', handleOutside, { capture: true })
        }
    }, [profileOp])

    const handleSignOut = () => {
        logOut()
        .then(() => {
            checkUser(setUser)
            setProfileOp(false)
        })
    }

    return (
        <motion.nav layout>
            <div className="searchBar">
                <div className="search" onClick={() => searchInput.current.focus()}>
                    <RiSearchLine />
                </div>
                <motion.input ref={searchInput} type="text" onKeyUp={handleSearch}
                placeholder='Search Products' whileFocus={{width: '100%', paddingInline: '1em'}}
                transition={{duration: 0.2, type: 'spring', damping: 20, stiffness: 100}}
                onBlur={e => {setSearch(null), (e.currentTarget.value = null)}} />
                <AnimatePresence>
                    {search &&
                        <SearchList search={search} />
                    }
                </AnimatePresence>
            </div>
            <ul>
                <li>
                    <NavLink to='/' end>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/categories'>
                        Categories
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/orders'>
                        Orders
                    </NavLink>
                </li>
                <li>
                    {!user ? 
                        <NavLink to={!user && '/login'} disabled={user === undefined}>
                            <RiUserLine />
                        </NavLink>
                    :
                        <div className="profile" ref={profile}>
                            <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="profilePic">
                                {user.photoURL ?
                                    <img src={user.photoURL} onClick={() => setProfileOp(!profileOp)} />
                                :
                                    <img src={`https://ui-avatars.com/api/?name=${user.displayName}&background=291d44&color=f45d92&size=48`}
                                    onClick={() => setProfileOp(!profileOp)} />
                                }
                            </motion.div>
                            <AnimatePresence>
                                {profileOp &&
                                    <motion.div className="actionsWrapper"
                                    initial={{opacity: 0, translateY: -100}}
                                    animate={{opacity: 1, translateY: 0}}
                                    exit={{opacity: 0}}>
                                        <div className="actions">
                                            <div className="sections">
                                                <NavLink to={'dashboard'} onClick={() => setProfileOp(false)}>
                                                    <RiDashboardFill />
                                                    Dashboard
                                                </NavLink>
                                                <span className='signOut' onClick={handleSignOut}>
                                                    <RiLogoutBoxLine />
                                                    Sign Out
                                                </span>
                                            </div>
                                        </div>
                                        <div className="shadow">
                                            <div className="sections">
                                                <a>
                                                    <RiDashboardFill />
                                                    Dashboard
                                                </a>
                                                <span>
                                                    <RiLogoutBoxLine />
                                                    Sign Out
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </div>
                    }
                </li>
            </ul>
            <div className="cart">
                <NavLink to='/cart'>
                    <CartWidget />
                </NavLink>
            </div>
        </motion.nav>
    )
}

export default NavBar