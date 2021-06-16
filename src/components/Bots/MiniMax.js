import Chess from "chess.js";
import getBoardEvaluation from './getBoardEvaluation'
/* 
    - Create copy of chess board
    - get moves
    - go through each move and get its evaluation
    - run minmax evaulating each move to a height of 3
*/


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


export default MiniMax
