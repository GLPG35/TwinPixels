import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { IconContext } from 'react-icons'
import App from './App'
import './scss/global.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <IconContext.Provider value={{style: {verticalAlign: 'middle', fontSize: '1.5em'}}}>
            <App />
        </IconContext.Provider>
    </BrowserRouter>
)
