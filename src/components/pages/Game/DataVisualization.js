import React from 'react'
import Button from '@material-ui/core/Button';

const DataVisualization = (props) => {
    const { selectedBot, randomBotAvaliableMoves, allBots, evalCount } = props;

    const randomBot = () => {
        const listAvaliableMoves = randomBotAvaliableMoves.map((move) => {
            return <li>{move}</li>
        })
        return (
            <>
                <p>Selecting random from avaliable moves</p>
                <ul className="avaliable-moves">
                    {listAvaliableMoves && listAvaliableMoves}
                </ul>
            </>
        )
    }
    const miniMaxBot = () => {
        return (
            <>
                <p>{`Postions Evaluated: ${evalCount.toLocaleString()}`}</p>
                <Button variant="outlined" color="secondary">
                    See Tree
                </Button>
            </>
        )

    }
    // updates return based on what bot is selected. 
    return (
        <div className="data-visualization">
            <h2>Data Visualization</h2>
            {allBots[0] === selectedBot ? randomBot() : null}
            {allBots[1] === selectedBot || allBots[2] === selectedBot ? miniMaxBot() : null}
        </div>
    )
}

export default DataVisualization
