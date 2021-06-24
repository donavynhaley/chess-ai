const randomBot = (chess, updateHistory, setRandomBotAvaliableMoves, setFen) => {
    // computer response random
    setTimeout(() => {

        // Get list of valid moves
        const moves = chess.moves();

        // update state for data vizualization
        setRandomBotAvaliableMoves(moves);

        // If valid move is avaliable selects random and updates chessboard
        if (moves.length > 0) {
            const computerMove = moves[Math.floor(Math.random() * moves.length)];
            chess.move(computerMove);

            // add move to history
            updateHistory(computerMove);

            // update chessboard
            setFen(chess.fen());
        }
    }, 300)
}

export default randomBot
