import React from 'react';

const MoveHistory = props => {
    const { movesHistory } = props;

    let line = 0;
    const listMoveHistory = () => {
        return movesHistory.map((move, index, arr) => {
            if (index % 2 === 0) {
                line++;
                return <li key={index} className={`node`}>
                    {line}.
                    <div className="playerNode">{move}</div>
                    <div className="playerNode">{arr[index + 1]}</div>
                </li>
            }
        })
    }

    return (
        <div className="move-history">
            <h2>Move History</h2>
            <ul className="move-list">
                {listMoveHistory()}
            </ul>
        </div>
    )
}


export default MoveHistory;
