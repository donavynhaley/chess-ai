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
        return [null, getBoardEvaluation(chessCopy.board())];
    }
    const moves = chessCopy.moves();
    let bestMove = moves[moves.length - 1];

    if (isMax) {
        let maxEval = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            chessCopy.move(moves[i])
            allEval[depth - 1].push({ score: getBoardEvaluation(chessCopy.board()), move: moves[i], moves: `${i}/${moves.length - 1}`, isMax: true })
            let currentEval = miniMaxRecursive(chessCopy, depth - 1, allEval, false)[1];
            chessCopy.undo();
            //console.log("Current Eval: " + currentEval + "| Max Eval " + maxEval)
            if (currentEval > maxEval) {
                maxEval = currentEval;
                bestMove = moves[i];
            }
        }
        return [bestMove, maxEval];

    }
    else {
        let minEval = Infinity;
        for (let i = 0; i < moves.length; i++) {
            chessCopy.move(moves[i])
            allEval[depth - 1].push({ score: getBoardEvaluation(chessCopy.board()), move: moves[i], moves: `${i}/${moves.length - 1}`, isMax: false })
            let currentEval = miniMaxRecursive(chessCopy, depth - 1, allEval, true)[1];
            chessCopy.undo()
            if (currentEval < minEval) {
                minEval = currentEval;
                bestMove = moves[i];
            }
        }
        return [bestMove, minEval]
    }

}

const fetchBestMove = async (chessCopy, depth, allEval, isMax) => {
    const bestMove = await miniMaxRecursive(chessCopy, depth, allEval, isMax)
    console.log(bestMove)
    return bestMove[0]
}

const MiniMax = (chess, updateComputerHistory, setFen) => {
    const allEval = [[], [], [], []]
    const chessCopy = new Chess(chess.fen());
    // computer response random
    fetchBestMove(chessCopy, 3, allEval, true).then((bestMove) => {

        // update position
        chess.move(bestMove);
        console.log(allEval);

        // add move to history
        updateComputerHistory(bestMove);

        // update chessboard
        setFen(chess.fen());
    })
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
