import React from 'react'
import Button from '@material-ui/core/Button';
import UndoOutlinedIcon from '@material-ui/icons/UndoOutlined';const UndoMove = ({ undo }) => {

    return (
        <div className="undo-move">
            <Button variant="outlined" color="secondary" onClick={undo}><UndoOutlinedIcon /> Undo</Button>
        </div>
    )
}

export default UndoMove
