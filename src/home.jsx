import './scss/home.scss'
import ItemListContainer from './components/modules/ItemListContainer'
import ConsoleViewer from './components/modules/ConsoleViewer'
import { NintendoSwitch } from './components/modules/consoles'
import itemList from './db/items.json'
import { useState } from 'react'

const Home = () => {
	const [category, setCategory] = useState('consoles')

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
						<h2>Recommended Products</h2>
						<div className="tabs">
							<span onClick={() => setCategory('consoles')}
							className={category == 'consoles' ? 'active' : undefined}>
								Consoles
							</span>
							<span onClick={() => setCategory('games')}
							className={category == 'games' ? 'active' : undefined}>
								Games
							</span>
							<span onClick={() => setCategory('accesories')}
							className={category == 'accesories' ? 'active' : undefined}>
								Accesories
							</span>
						</div>
					</div>
					<ItemListContainer items={itemList} categoryList={[category]} />
				</div>
			</div>
		</div>
	)
}

export default Home