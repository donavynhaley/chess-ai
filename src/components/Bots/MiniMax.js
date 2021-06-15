import Chess from "chess.js";

/* 
    - Create copy of chess board
    - get moves
    - go through each move and get its evaluation
    - run minmax evaulating each move to a height of 3
*/

/* based on stockfish midgame piece evaluations
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

const miniMaxRecursive = (chessCopy, depth, allEval, isMax) => {
    if (depth === 0) {
        return getBoardEvaluation(chessCopy.board());
    }
    const moves = chessCopy.moves();
    let bestMove = moves[Math.floor(Math.random() * moves.length)];
    if (isMax) {
        let maxEval = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            chessCopy.move(moves[i])
            allEval.push({ score: getBoardEvaluation(chessCopy.board()), move: moves[i], depth: depth })
            let currentEval = miniMaxRecursive(chessCopy, depth - 1, allEval, false);
            chessCopy.undo();
            console.log(maxEval + " max " + currentEval)
            if (currentEval > maxEval) {
                maxEval = currentEval;
                bestMove = moves[i];
            }
        }
        return bestMove;

    }
    else {
        let minEval = Infinity;
        for (let i = 0; i < moves.length; i++) {
            chessCopy.move(moves[i])
            allEval.push({ score: getBoardEvaluation(chessCopy.board()), move: moves[i], depth: depth })
            let currentEval = miniMaxRecursive(chessCopy, depth - 1, allEval, true);
            chessCopy.undo()
            console.log(minEval + " min " + currentEval)

            if (currentEval < minEval) {
                minEval = currentEval;
                bestMove = moves[i];
            }
        }
        return bestMove
    }

}
const MiniMax = (chess, updateComputerHistory, setRandomBotAvaliableMoves, setFen) => {
    const originalFen = chess.fen();
    const allEval = []
    const chessCopy = new Chess(chess.fen());
    allEval.push({ score: getBoardEvaluation(chess.board), move: 'original', depth: 2 })
    // computer response random
    setTimeout(() => {
        const bestMove = miniMaxRecursive(chessCopy, 2, allEval, originalFen, true)
        console.log(bestMove)
        console.log(allEval)

        // update position
        chess.move(bestMove)

        // add move to history
        updateComputerHistory(bestMove);

        // update chessboard
        setFen(chess.fen());
    }, 1000)
}
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

export default MiniMax
