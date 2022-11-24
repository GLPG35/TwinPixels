import '../../scss/searchList.scss'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const SearchList = ({ search }) => {
    const navigate = useNavigate()

    return (
        <motion.div className="searchList"
        initial={{height: 0, y: '90%'}} animate={{height: 'max-content', y: '110%'}}
        exit={{height: 0, y: '110%', opacity: 0}}>
            {search.map(({ id, pic, title }) => {
                return (
                    <div key={id} className="searchItem"
                    onClick={() => navigate(`/item/${id}`)}>
                        <div className="pic">
                            <img src={pic} />
                        </div>
                        <div className="title">
                            {title}
                        </div>
                    </div>
                )
            })}
        </motion.div>
    )
}

export default SearchList