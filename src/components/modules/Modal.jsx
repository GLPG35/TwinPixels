import '../../scss/modal.scss'
import { motion } from 'framer-motion'

const Modal = ({ message, accept = 'Yes', decline = 'No', handleClose, id, handleConfirm }) => {
    return (
        <motion.div className="modalContainer" onClick={handleClose}
        initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <motion.div className="modalWrapper" onClick={e => e.stopPropagation()}
            initial={{scale: 0.5, opacity: 0}} animate={{scale: 1, opacity: 1}}
            exit={{scale: 0.5, opacity: 0}}>
                <div className="modal">
                    <div className="message">
                        {message}
                    </div>
                    <div className="buttons">
                        <div className="button">
                            <button className="accept" onClick={() => handleConfirm(id)}>
                                {accept}
                            </button>
                        </div>
                        <div className="button">
                            <button className="decline" onClick={handleClose}>
                                {decline}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="shadow">
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Modal