import React from 'react'
import Button from '@material-ui/core/Button';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

const UndoMove = ({ undo }) => {

    return (
        <div className="undo-move">
            <Button variant="outlined" color="secondary" onClick={undo}><ArrowBackOutlinedIcon /> Undo</Button>
        </div>
    )
}

export default UndoMove
