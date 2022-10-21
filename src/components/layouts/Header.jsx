import { NavLink } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import NavBar from './NavBar'
import TPLogo from '../modules/TPLogo'

const Header = () => {
    const handleSearch = () => {
        
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
            <NavBar handleSearch={handleSearch} />
        </header>
    )
}

export default Header