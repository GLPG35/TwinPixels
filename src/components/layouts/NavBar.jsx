import { NavLink } from 'react-router-dom'
import { RiUserLine, RiSearchLine } from 'react-icons/ri'
import '../../scss/header.scss'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import CartWidget from '../modules/CartWidget'

const NavBar = ({ handleSearch }) => {
    const searchInput = useRef()

    return (
        <nav>
            <div className="searchBar">
                <div className="search" onClick={() => searchInput.current.focus()}>
                    <RiSearchLine />
                </div>
                <motion.input ref={searchInput} type="text" onKeyUp={handleSearch}
                placeholder='Search Games' whileFocus={{width: '100%', paddingInline: '1em'}}
                transition={{duration: 0.2, type: 'spring', damping: 20, stiffness: 100}} />
            </div>
            <ul>
                <li>
                    <NavLink to='/' className={({ isActive }) => isActive ? 'active' : undefined} end>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/categories' className={({ isActive }) => isActive ? 'active' : undefined}>
                        Categories
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/contact' className={({ isActive }) => isActive ? 'active' : undefined}>
                        Contact
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/login' className={({ isActive }) => isActive ? 'active' : undefined}>
                        <RiUserLine />
                    </NavLink>
                </li>
            </ul>
            <div className="cart">
                <NavLink to='/cart' className={({ isActive }) => isActive ? 'active' : undefined}>
                    <CartWidget />
                </NavLink>
            </div>
        </nav>
    )
}

export default NavBar