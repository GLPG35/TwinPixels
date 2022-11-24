import { Outlet } from 'react-router-dom'
import { createContext, useState, useEffect } from 'react'
import { IconContext } from 'react-icons'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import { checkUser } from './firebase/client'

export const globalContext = createContext('')

const App = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [user, setUser] = useState(undefined)

    useEffect(() => {
        checkUser(setUser)
    }, [])

    return (
        <IconContext.Provider value={{style: {verticalAlign: 'middle', fontSize: '1.5em'}}}>
            <globalContext.Provider value={{ cart, setCart, user, setUser }}>
                <div className="App">
                    <Header />
                    <Outlet />
                    <Footer />
                </div>
            </globalContext.Provider>
        </IconContext.Provider>
    )
}

export default App