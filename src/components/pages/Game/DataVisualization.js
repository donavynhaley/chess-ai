import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TreeVisualization from './TreeVisualization';
import SimpleModal from '../../common/SimpleModel'

const DataVisualization = (props) => {
    const { selectedBot, randomBotAvaliableMoves, allBots, evalCount, treeData } = props;
    const [openModal, setOpenModal] = useState(false);

    const handleClose = () => {
        setOpenModal(false)
    }

    const handleOpen = () => {
        console.log("opens")
        setOpenModal(true)
    }

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
                <SimpleModal openModal={openModal} setOpenModal={setOpenModal} title={"Tree"} desc={<TreeVisualization data={treeData} />} onClick={handleClose} buttonText="Close Modal" />
                <div className="evaluation"><h3>Postions Evaluated</h3> <p>{evalCount.toLocaleString()}</p></div>
                <Button size="large" variant="outlined" color="secondary" onClick={handleOpen}>
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
