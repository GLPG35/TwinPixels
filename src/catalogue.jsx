import './scss/categories.scss'
import { SiNintendoswitch, SiPlaystation, SiXbox } from 'react-icons/si'
import { Link } from 'react-router-dom'

const Categories = () => {
    return (
        <div className="categories">
            <div className="container1">
                <h2>Categories</h2>
                <div className="platforms">
                    <div className="platform nintendo">
                        <div className="icon">
                            <SiNintendoswitch />
                        </div>
                        <div className="sections">
                            <Link to='/consoles/nintendo'>Consoles</Link>
                            <Link to='/games/nintendo'>Games</Link>
                        </div>
                    </div>
                    <div className="platform playStation">
                        <div className="icon">
                            <SiPlaystation />
                        </div>
                        <div className="sections">
                            <Link to='/consoles/playstation'>Consoles</Link>
                            <Link to='/games/playstation'>Games</Link>
                        </div>
                    </div>
                    <div className="platform xbox">
                        <div className="icon">
                            <SiXbox />
                        </div>
                        <div className="sections">
                            <Link to='/consoles/xbox'>Consoles</Link>
                            <Link to='/games/xbox'>Games</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories