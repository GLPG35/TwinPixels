import './scss/consoles.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import consolesJSON from './db/consoles.json'

const Consoles = () => {
    const { platform: platformParam } = useParams()
    const [consoles, setConsoles] = useState(false)

    useEffect(() => {
        setConsoles(consolesJSON)
    }, [])

    return (
        <div className="consoles">
            <div className="container1">
                {consoles &&
                    <h2>{consoles.filter(x => x.platform.name.toLowerCase() == platformParam)[0].platform.name}</h2>
                }
                <div className="consoleList">
                    {consoles &&
                        consoles.filter(x => x.platform.name.toLowerCase() == platformParam)
                        .map(({ platform }) => {
                            const { consoles } = platform

                            return consoles.map(({ name, id, picture }) => {
                                return (
                                    <div className="item" key={id}>
                                        <span>{name}</span>
                                    </div>
                                )
                            })
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Consoles