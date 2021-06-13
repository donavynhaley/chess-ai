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

const MiniMax = (chess, updateComputerHistory, setRandomBotAvaliableMoves, setFen) => {
    const allEval = []
    const chessCopy = new Chess(chess.fen());

    // computer response random
    setTimeout(() => {

        // Get list of valid moves
        const moves = chessCopy.moves();
        console.log(moves)
        getBoardEvaluation(chessCopy.board())
        // update state for data vizualization
        // setRandomBotAvaliableMoves(moves);

        // If valid move is avaliable selects random and updates chessboard
        if (moves.length > 0) {
            const computerMove = moves[Math.floor(Math.random() * moves.length)];
            chess.move(computerMove);

            // add move to history
            updateComputerHistory(computerMove);

            // update chessboard
            setFen(chess.fen());
        }
    }, 300)
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
    console.log(count)
}

export default MiniMax
