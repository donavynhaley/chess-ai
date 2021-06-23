import React from 'react'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

const GameRecap = ({ result, botType, depth, moveHistory }) => {
    return (
        <div>
            <Paper className="recap-container" elevation={3} >
                <div className="recap-header">
                    <h3>{result}</h3>
                </div>
                <Divider />
                <div className="recap-subheader">
                    <div className="recap-info">Bot Type: {botType}</div>
                    <div className="recap-info">Depth: {depth}</div>
                </div>
                <Divider />
                <div className="recap-body">

                </div>
            </Paper>
        </div>
    )
}

export default GameRecap
