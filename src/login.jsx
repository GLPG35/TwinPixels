import { RiSendPlaneFill, RiCloseFill } from 'react-icons/ri'
import './scss/login.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { signIn } from './firebase/client'
import { useState, useContext, useEffect } from 'react'
import { globalContext } from './App'
import { useNavigate } from 'react-router-dom'
import Spinner from './components/modules/Spinner'

const Login = () => {
    const { user, setUser } = useContext(globalContext)
    const [wrongE, setWrongE] = useState(false)
    const [wrongP, setWrongP] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        user && navigate('/dashboard')
    }, [user])

    const handleInput = e => {
        if (e.target.name == 'email') {
            wrongE == true && setWrongE(false)
        } else if (e.target.name == 'password') {
            wrongP == true && setWrongP(false)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        setSpinner(true)

        const { email: { value: email }, password: { value: password } } = e.target
        const errors = [
            {
                error: 'auth/user-not-found',
                input: setWrongE
            },
            {
                error: 'auth/wrong-password',
                input: setWrongP
            }
        ]

        signIn(email, password)
        .then((userCredentials) => {
            setSpinner(false)
            setUser(userCredentials.user)
        })
        .catch((err) => {
            const errCode = err.code
            setSpinner(false)
            
            errors.forEach(({error, input}) => {
                if (errCode == error) {
                    input(true)
                }
            })            
        })
    }

    return (
        <div className="login">
            <div className="container1">
                <AnimatePresence>
                    {spinner && <Spinner />}
                </AnimatePresence>
                <form onSubmit={handleSubmit}>
                    <div className="top">
                        <h2>Admin Panel</h2>
                    </div>
                    <div className="inputs">
                        <div className={wrongE ? 'input error' : 'input'}>
                            <input type="email" placeholder='E-Mail' name='email' required
                            onInput={handleInput} />
                            <span>
                                <RiCloseFill />
                            </span>
                        </div>
                        <div className={wrongP ? 'input error' : 'input'}>
                            <input type="password" placeholder='Password' name='password' required
                            onInput={handleInput} />
                            <span>
                                <RiCloseFill />
                            </span>
                        </div>
                    </div>
                    <motion.button type='submit'
                    whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                        Send <RiSendPlaneFill />
                    </motion.button>
                </form>
            </div>
        </div>
    )
}

export default Login