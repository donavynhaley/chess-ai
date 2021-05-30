import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import Chessboard from 'chessboardjsx';
import Chess, { ChessInstance } from "chess.js";
import MoveHistory from './components/MoveHistory';

function App() {
  const [chess] = useState(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));
  const [fen, setFen] = useState(chess.fen());
  const [movesHistory, setMovesHistory] = useState([]);
  const [selectedBot, setSelectedBot] = useState();

  // add move to history
  const updateHistory = (newMove) => {
    const currentMovesHistory = movesHistory;
    const pieceType = chess.get(newMove.to).type.toUpperCase();
    let move;
    // do not display pawn
    if (pieceType === "P") {
      move = `${newMove.to}`
    }
    else {
      move = `${pieceType}${newMove.to}`
    }
    currentMovesHistory.push(move);
    setMovesHistory(currentMovesHistory);
  }

  const handlePlayerMove = (playerMove) => {
    // Checks if playermove is valid
    if (chess.move(playerMove)) {
      // add move to history
      updateHistory(playerMove);

      // computer response random
      setTimeout(() => {
        // Get list of valid moves
        const moves = chess.moves();

        // If valid move is avaliable selects random and updates chessboard
        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);

          // add move to history
          const currentMovesHistory = movesHistory;
          currentMovesHistory.push(computerMove);
          // update chessboard
          setFen(chess.fen());
        }
      }, 300)

      // update chessboard
      setFen(chess.fen());
    }
  }
  return (
    <div className="app-container">
      <h1>Chess AI</h1>
      <div className="chess-container">
        <Chessboard
          width={400}
          position={fen}
          onDrop={(move) => handlePlayerMove({
            from: move.sourceSquare,
            to: move.targetSquare,
            promotion: "q",
          })}

        />
      </div>
      <div className="utility-container">
        <MoveHistory movesHistory={movesHistory} chess={chess} />

        <div className="data-visualization">

        </div>
      </div>
    </div>
  );
}

export default App;
