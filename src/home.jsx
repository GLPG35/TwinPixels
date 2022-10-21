import './scss/home.scss'
import ItemListContainer from './components/modules/ItemListContainer'
import ConsoleViewer from './components/modules/ConsoleViewer'
import { NintendoSwitch } from './components/modules/consoles'

const Home = () => {
	return (
		<div className="home">
			<div className="container1">
				<ItemListContainer greeting={'Hi, Welcome to Twin Pixels!'} />
				<div className="nintendoSwitch">
					<ConsoleViewer bloom={3}>
						<NintendoSwitch scale={1.2} />
					</ConsoleViewer>
				</div>
			</div>
		</div>
	)
}

export default Home