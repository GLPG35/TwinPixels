import './scss/404.scss'
import NotFound from './components/modules/NotFound'
import { RiPlugLine, RiHome2Fill } from 'react-icons/ri'

const Page404 = () => {
    return (
        <div className="page404">
            <div className="container1" >
                <NotFound title={"This page doesn't exist!"}
                message={'Please verify your URL or go back home'}
                icon={<RiPlugLine />} btnText={'Go home'}
                btnIcon={<RiHome2Fill />} route={'/'}
                height='calc(100vh - 6em)' />
            </div>
        </div>
    )
}

export default Page404