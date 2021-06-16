import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from './Button'



const SimpleModel = (props) => {
    const { openModal, setOpenModal, title, desc, onClick, buttonText } = props;

    const handleClose = () => {
        setOpenModal(false)
    }

    const body = (
        <div className="simple-modal-content">
            <h2 className="simple-modal-title">{title}</h2>
            <div className="simple-modal-description">
                {desc}
            </div>
            <Button onClick={onClick} text={buttonText} />
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
