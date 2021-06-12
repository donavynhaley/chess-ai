import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from './Button'



const SimpleModel = (props) => {
    const { openModal, setOpenModal, resetGame, title, desc } = props;

    const handleClose = () => {
        setOpenModal(false)
    }

    const body = (
        <div className="simple-modal-content">
            <h2 className="simple-modal-title">{title}</h2>
            <p className="simple-modal-description">
                {desc}
            </p>
            <Button onClick={resetGame} text={"Play Again?"} />
            <SimpleModel />
        </div>
    )
    return (
        <div class="modal-container">
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    )
}

export default SimpleModel
