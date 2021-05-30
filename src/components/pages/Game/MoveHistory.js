import React from 'react';

const MoveHistory = props => {
    const { movesHistory } = props;

    let count = 0;
    const listMoveHistory = movesHistory.map((move) => {
        count++;
        return <li className={`node`}>{count}. {move.playerMove} {move.computerMove}</li>
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
