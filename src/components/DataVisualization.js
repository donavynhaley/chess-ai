import React from 'react'

const DataVisualization = (props) => {
    const { selecetedBot, randomBotAvaliableMoves } = props;

    const listAvaliableMoves = randomBotAvaliableMoves.map((move) => {
        return <li>{move}</li>
    })
    // updates return based on what bot is selected. 
    console.log(randomBotAvaliableMoves);
    return (
        <div className="data-visualization">
            <h2>Data Visualization Random Bot</h2>
            <p>Selecting from avaliable moves</p>
            <ul className="avaliable-moves">
                {listAvaliableMoves}
            </ul>


        </div>
    )
}

export default DataVisualization
