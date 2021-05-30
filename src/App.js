import React, { useState, useEffect, useRef } from 'react'
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
  const [boardSize, setBoardSize] = useState(460);
  const ref = useRef(null);

  useEffect(() => {
    console.log(ref.current)
    setBoardSize(ref.current.offsetWidth);
  }, [ref.current])


  // add playermove to history
  const updatePlayerHistory = (newMove) => {
    const currentMovesHistory = movesHistory;
    const pieceType = chess.get(newMove.to).type.toUpperCase();
    let move;
    // do not display pawn
    if (pieceType === "P") {
      move = { playerMove: `${newMove.to}` }
    }
    else {
      move = { playerMove: `${pieceType}${newMove.to}` }
    }
    currentMovesHistory.push(move);
    setMovesHistory(currentMovesHistory);
  }

  const handlePlayerMove = (playerMove) => {
    // Checks if playermove is valid
    if (chess.move(playerMove)) {
      // add move to history
      updatePlayerHistory(playerMove);

      // computer response random
      setTimeout(() => {
        // Get list of valid moves
        const moves = chess.moves();

        // If valid move is avaliable selects random and updates chessboard
        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)];
          chess.move(computerMove);

          // add move to history
          const currentMove = movesHistory[movesHistory.length - 1];
          const newMove = { ...currentMove, computerMove: computerMove }
          movesHistory[movesHistory.length - 1] = newMove;

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
      <div className="chess-container">
        <h1>Chess AI</h1>
        <div ref={ref} className="chessboard-container">
          <Chessboard
            width={boardSize}
            position={fen}
            onDrop={(move) => handlePlayerMove({
              from: move.sourceSquare,
              to: move.targetSquare,
              promotion: "q",
            })}

          />
        </div>
      </div>
      <div className="utility-container">
        <MoveHistory movesHistory={movesHistory} />
        <div className="data-visualization">
          <h2>Data Viz</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
