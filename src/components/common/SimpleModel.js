import React from 'react'
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
            {buttonText ? <Button onClick={onClick} text={buttonText} /> : null}

            <SimpleModel />
        </div>
    )

    return (
        <div className="modal-container">
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
