import './scss/home.scss'
import ItemListContainer from './components/modules/ItemListContainer'
import ConsoleViewer from './components/modules/ConsoleViewer'
import { NintendoSwitch } from './components/modules/consoles'
import { getItems } from './firebase/client'
import { useState, useEffect } from 'react'

const Home = () => {
	const [category, setCategory] = useState('console')
	const [items, setItems] = useState(undefined)

	useEffect(() => {
		getItems().then(setItems)
	}, [])

	return (
		<div className="home">
			<div className="container1">
				<div className="message">
					<h1>Hi, Welcome to Twin Pixels!</h1>
				</div>
				<div className="nintendoSwitch">
					<ConsoleViewer bloom={3}>
						<NintendoSwitch scale={1.3} />
					</ConsoleViewer>
				</div>
			</div>
			<div className="container2">
				<div className="topProducts">
					<div className="subTitle">
						<h2>Recommended Products (A-Z)</h2>
						<div className="tabs">
							<span onClick={() => setCategory('console')}
							className={category == 'console' ? 'active' : undefined}>
								Consoles
							</span>
							<span onClick={() => setCategory('game')}
							className={category == 'game' ? 'active' : undefined}>
								Games
							</span>
							<span onClick={() => setCategory('accesory')}
							className={category == 'accesory' ? 'active' : undefined}>
								Accesories
							</span>
						</div>
					</div>
					<ItemListContainer items={items} categoryList={[category]} />
				</div>
			</div>
		</div>
	)
}

export default Home