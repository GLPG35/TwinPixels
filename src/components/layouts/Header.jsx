import { NavLink, useNavigate } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import NavBar from './NavBar'
import TPLogo from '../modules/TPLogo'
import { useState } from 'react'
import { useEffect } from 'react'
import { getItems } from '../../firebase/client'

const Header = () => {
    const [items, setItems] = useState(undefined)
    const [search, setSearch] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        !items && getItems().then(setItems)
    }, [])

    const handleSearch = e => {
        const { value: query } = e.target
        const { key } = e

        if (key == 'Enter') {
            navigate(`/category/search?q=${query}`)
        }

        if (items && query.length >= 3) {
            const filter = items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
            setSearch(filter)
        } else {
            setSearch(null)
        }
    }

    return (
        <header>
            <div className="menu">
                <FaBars />
            </div>
            <div className="logo">
                <NavLink to='/'>
                    <TPLogo />
                </NavLink>
            </div>
            <NavBar handleSearch={handleSearch} search={search} setSearch={setSearch} />
        </header>
    )
}

export default Header