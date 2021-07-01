import React from 'react'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import MoveHistory from '../Game/MoveHistory'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const GameRecap = ({ result, botType, depth, moveHistory }) => {
    return (
        <div>
            <Paper className="recap-container" elevation={3} >
                <div className="recap-header">
                    <h3>{result}</h3>
                </div>
                <Divider />
                <div className="recap-subheader">
                    <div className="recap-info"><h4>Bot Type:</h4> <span>{botType}</span></div>
                    <div className="recap-info"><h4>Depth:</h4> <span>{depth}</span></div>
                </div>
                <Divider />
                <div className="recap-body">
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <h4>Move History</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MoveHistory movesHistory={moveHistory} className={"recap"}/>
                    </AccordionDetails>
                </Accordion>
                </div>
            </Paper>
        </div>
    )
}

export default GameRecap
