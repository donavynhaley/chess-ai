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
            allEval[depth - 1].push({ score: getBoardEvaluation(chessCopy.fen()), move: moves[i], currentMove: i, totalMoves: moves.length - 1, isMax: true })
            // Recursive call minimax with lower depth
            let currentEval = miniMaxRecursive(chessCopy, depth - 1, allEval, false)[1];
            // Undo move
            chessCopy.undo();
            // Sets best move according to currentEval max
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
            allEval[depth - 1].push({ score: getBoardEvaluation(chessCopy.fen()), move: moves[i], currentMove: i, totalMoves: moves.length - 1, isMax: true })
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
    let bestMove = await miniMaxRecursive(chessCopy, depth, allEval, isMax)
    if(bestMove[1] === 0){
        const moves = chessCopy.moves();
        bestMove[0] = moves[getRandomMNum(0, moves.length)];
    }
    return bestMove[0]
}

const getRandomMNum = (min, max) => {
    return Math.floor(Math.random() * (max-min) + min)
}
const toTreeData = (allEval, treeData, depth) => {
    let i = depth - 1
    if (i < 0)
        return treeData

    for (let j = 0; j < allEval[i].length; j++) {
        treeData.children.push({
            name: allEval[i][j].move,
            attributes: {
                score: allEval[i][j].score,
            },
            children: []
        })
    }
    i -= 1
    if (i < 0)
        return treeData

    let index = 0
    for (let j = 0; j < allEval[i].length; j++) {
        treeData.children[index].children.push({
            name: allEval[i][j].move,
            attributes: {
                score: allEval[i][j].score,
            },
            children: []
        })
        if (allEval[i][j].currentMove === allEval[i][j].totalMoves) {
            index += 1
        }
    }
    index = 0
    let indexTwo = 0
    i -= 1
    if (i < 0)
        return treeData

    for (let j = 0; j < allEval[i].length; j++) {
        treeData.children[indexTwo].children[index].children.push({
            name: allEval[i][j].move,
            attributes: {
                score: allEval[i][j].score,
            },
            children: []
        })
        if (allEval[i][j].currentMove === allEval[i][j].totalMoves) {
            index += 1
            if (index >= treeData.children[indexTwo].children.length) {
                indexTwo += 1
                index = 0
            }
        }
    }
    return treeData
}
const MiniMax = (chess, updateHistory, setFen, setEvalCount, setTreeData, depth) => {
    const allEval = [[], [], []]
    const treeData = {
        name: "Start",
        attributes: {
            score: getBoardEvaluation(chess.fen()),
        },
        children: []
    }
    const chessCopy = new Chess(chess.fen());
    fetchBestMove(chessCopy, depth, allEval, true).then((bestMove) => {

        // update position
        chess.move(bestMove);
        console.log(allEval);

        // Update eval count
        const totalEvaluations = allEval.map((evaluation) => {
            return evaluation.length
        })
        setEvalCount(totalEvaluations.reduce((a, b) => a + b, 0))

        // convert to tree data
        setTreeData(toTreeData(allEval, treeData, depth))

        // add move to history
        updateHistory();

        // update chessboard
        setFen(chess.fen());
    })
}


export default MiniMax
