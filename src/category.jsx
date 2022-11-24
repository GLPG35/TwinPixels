import { useParams, useSearchParams } from 'react-router-dom'
import ItemListContainer from './components/modules/ItemListContainer'
import './scss/category.scss'
import { getItems } from './firebase/client'
import { useEffect, useState } from 'react'
import NotFound from './components/modules/NotFound'
import { RiPriceTag3Line, RiAppsLine, RiGamepadLine } from 'react-icons/ri'

const Category = () => {
    const { id } = useParams()
    const [params] = useSearchParams()
    const platform = params.get('platform')
    const searchQ = params.get('q')
    const [items, setItems] = useState()

    const options = {
        console: [
            {
                platform: 'nintendo',
                title: 'Nintendo Consoles'
            },
            {
                platform: 'playstation',
                title: 'PlayStation Consoles'
            },
            {
                platform: 'xbox',
                title: 'Xbox Consoles'
            },
            {
                platform: 'pc',
                title: 'PC Consoles'
            }
        ],
        game: [
            {
                platform: 'nintendo',
                title: 'Nintendo Games'
            },
            {
                platform: 'playstation',
                title: 'PlayStation Games'
            },
            {
                platform: 'xbox',
                title: 'Xbox Games'
            },
            {
                platform: 'pc',
                title: 'PC Games'
            }
        ],
        accesory: [
            {
                platform: 'nintendo',
                title: 'Nintendo Accesories'
            },
            {
                platform: 'playstation',
                title: 'PlayStation Accesories'
            },
            {
                platform: 'xbox',
                title: 'Xbox Accesories'
            },
            {
                platform: 'pc',
                title: 'PC Accesories'
            }
        ]
    }
    const exist = options[id] || id == 'search'
    const currentPlatform = id != 'search' && exist?.find(x => x.platform == platform)
    const title = currentPlatform?.title


    useEffect(() => {
        getItems().then(setItems)
    }, [])

    return (
        <div className="category">
            <div className="container1">
                <div className="title">
                    <h2>{title}</h2>
                </div>
                {id == 'search' ?
                    <ItemListContainer items={items} search={searchQ} />
                :
                    !exist ?
                        <NotFound title={"This category doesn't exist"}
                        message={'Please check your URL or select another category'}
                        icon={<RiPriceTag3Line />} btnIcon={<RiAppsLine />}
                        btnText={'Go to categories'} route={'/categories'} />
                    : !currentPlatform ?
                        <NotFound title={"This platform doesn't exist"}
                        message={'Please check your URL or select another category'}
                        icon={<RiGamepadLine />} btnIcon={<RiAppsLine />}
                        btnText={'Go to categories'} route={'/categories'} />
                    :
                        <ItemListContainer items={items} categoryList={[id, platform]} />
                }
            </div>
        </div>
    )
}

export default Category