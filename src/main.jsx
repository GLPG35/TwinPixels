import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './scss/global.scss'
import Home from './home'
import Page404 from './404'
import Categories from './categories'
import Consoles from './consoles'
import Login from './login'
import Category from './category'
import ItemDetailContainer from './components/modules/ItemDetailContainer'
import Cart from './cart'
import Dashboard from './dashboard'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/categories',
                element: <Categories />
            },
            {
                path: '/category/:id',
                element: <Category />
            },
            {
                path: '/item/:id',
                element: <ItemDetailContainer />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '*',
                element: <Page404 />
            },
            
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
