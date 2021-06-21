import React from 'react';

const MoveHistory = props => {
    const { movesHistory } = props;

    let count = 0;
    const listMoveHistory = movesHistory.map((move) => {
        count++;
        return <li className={`node`}>{count}. <div className="playerNode">{move.playerMove}</div> <div className="playerNode">{move.computerMove}</div></li>
    })

    return (
        <div className="move-history">
            <h2>Move History</h2>
            <ul className="move-list">
                {listMoveHistory}
            </ul>
        </div>
    )
}


export default MoveHistory;
