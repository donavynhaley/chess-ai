import Chess from "chess.js";
import getBoardEvaluation from './getBoardEvaluation'


const miniMaxRecursive = (chessCopy, depth, allEval, isMax) => {
    if (depth === 0) {
        return [null, getBoardEvaluation(chessCopy.fen())];
    }

    const moves = chessCopy.moves();
    let bestMove = moves[Math.floor(Math.random() * moves.length)];

    if (isMax) {
        let maxEval = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            // Update move
            chessCopy.move(moves[i])
            // Push board eval to list
            allEval[depth - 1].push({ score: getBoardEvaluation(chessCopy.fen()), move: moves[i], moves: `${i}/${moves.length - 1}`, isMax: true })
            // Recursive call minimax with lower depth
            let currentEval = miniMaxRecursive(chessCopy, depth - 1, allEval, false)[1];
            // Undo move
            chessCopy.undo();
            // Sets best move according to currentEval min
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
            // Update move
            chessCopy.move(moves[i])
            // Push board eval to list
            allEval[depth - 1].push({ score: getBoardEvaluation(chessCopy.fen()), move: moves[i], moves: `${i}/${moves.length - 1}`, isMax: false })
            // Recursive call minimax with lower depth
            let currentEval = miniMaxRecursive(chessCopy, depth - 1, allEval, true)[1];
            // Undo move
            chessCopy.undo()
            // Sets best move according to currentEval min
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

const MiniMax = (chess, updateComputerHistory, setFen, setEvalCount) => {
    const allEval = [[], [], []]
    const chessCopy = new Chess(chess.fen());
    console.log(getBoardEvaluation(chess.fen()))
    // computer response random
    fetchBestMove(chessCopy, 3, allEval, true).then((bestMove) => {

        // update position
        chess.move(bestMove);
        console.log(allEval);

        // Update eval count
        const totalEvaluations = allEval.map((evaluation) => {
            return evaluation.length
        })
        setEvalCount(totalEvaluations.reduce((a, b) => a + b, 0))
        // add move to history
        updateComputerHistory(bestMove);

        // update chessboard
        setFen(chess.fen());
    })
}


export default MiniMax
