import React from 'react';
import Divider from '@material-ui/core/Divider';

const MoveHistory = props => {
    const { movesHistory, className } = props;

    let line = 0;
    const listMoveHistory = () => {
        return movesHistory.map((move, index, arr) => {
            if (index % 2 === 0) {
                line++;
                return (<li key={index} className={`node`}>
                    <div className="line-number">{line}.</div>
                        <div className="move">
                        <div className="playerNode">{move}</div>
                    <div className="playerNode">{arr[index + 1]}</div>
                    </div>
                </li>)
            }
        })
    }

    return (
        <div className={`move-history`}>
            {className ? "" : <h2>Move History</h2>}
            <ul className={`move-list ${className ? className: ""}`}>
                {listMoveHistory()}
            </ul>
        </div>
    )
}


export default MoveHistory;
