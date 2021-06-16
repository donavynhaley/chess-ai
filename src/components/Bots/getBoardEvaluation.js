
/* 
based on stockfish midgame piece evaluations
PawnValueMg = 128, 
KnightValueMg = 781,
BishopValueMg = 825, 
RookValueMg = 1276, 
QueenValueMg = 2538,
*/

let pieceValues = new Map()
// Black
pieceValues['p'] = 128;
pieceValues['n'] = 781;
pieceValues['b'] = 825;
pieceValues['r'] = 1276;
pieceValues['q'] = 2538;
pieceValues['k'] = 9999;

// White
pieceValues['P'] = -128;
pieceValues['N'] = -781;
pieceValues['B'] = -825;
pieceValues['R'] = -1276;
pieceValues['Q'] = -2538;
pieceValues['K'] = -9999;

// returns total piece values
const getBoardEvaluation = (fen) => {
    let count = 0;
    for (let i = 0; i < fen.length; i++) {
        // Breaks after pieces string ends. All fens have a space after board declaration
        if (fen.charAt(i) === " ")
            break

        if (pieceValues[fen.charAt(i)] !== undefined)
            count += pieceValues[fen.charAt(i)]
    }

    return count
}

export default getBoardEvaluation