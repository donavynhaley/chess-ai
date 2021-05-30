import React from 'react';

const MoveHistory = props => {
    const { movesHistory } = props;
    let chessPieceMap = new Map();

    chessPieceMap.set("p", "Pawn");
    chessPieceMap.set("r", "Rook");
    chessPieceMap.set("n", "Knight");
    chessPieceMap.set("b", "Bishop");
    chessPieceMap.set("q", "Queen");
    chessPieceMap.set("k", "King");
    console.log(movesHistory);

    const listMoveHistory = movesHistory.map((move) => {
        return <div className={`node`}>{}{move}</div>
    })

    return (
        <div className="move-history">
            <h2>Move History</h2>
            {listMoveHistory}
        </div>
    )
}


export default MoveHistory;
