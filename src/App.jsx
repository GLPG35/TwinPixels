import { Route, Routes } from 'react-router-dom'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Home from './home'
import Page404 from './404'
import Categories from './catalogue'
import Consoles from './consoles'

const App = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/consoles/:platform' element={<Consoles />} />
                <Route path='/games/:platform' />
                <Route path='*' element={<Page404 />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App