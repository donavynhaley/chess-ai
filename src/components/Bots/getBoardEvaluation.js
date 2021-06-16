
/* 
based on stockfish midgame piece evaluations
PawnValueMg = 128, 
KnightValueMg = 781,
BishopValueMg = 825, 
RookValueMg = 1276, 
QueenValueMg = 2538,
*/

let pieceValues = new Map()
pieceValues['p'] = 128;
pieceValues['n'] = 781;
pieceValues['b'] = 128;
pieceValues['r'] = 1276;
pieceValues['q'] = 2538;
pieceValues['k'] = 9999;

const getBoardEvaluation = (board) => {
    let count = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === null)
                continue
            let piece = board[i][j].type
            let color = board[i][j].color
            if (color === 'b') {
                count += pieceValues[piece]
            }
            else {
                count -= pieceValues[piece]
            }
        }
    }
    return count
}

export default getBoardEvaluation