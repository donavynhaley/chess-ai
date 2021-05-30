import React, { useState, useEffect, useRef } from 'react'
import './App.css';
import Chessboard from 'chessboardjsx';
import Chess from "chess.js";
import MoveHistory from './components/MoveHistory';
import DataVisualization from './components/DataVisualization';
import NavBar from './components/NavBar';
import randomBot from './components/Bots/randomBot';
const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

function App() {
  const [chess] = useState(new Chess(startingFen));
  const [fen, setFen] = useState(chess.fen());
  const [movesHistory, setMovesHistory] = useState([]);
  const [selectedBot, setSelectedBot] = useState();
  const [gameOverText, setGameOverText] = useState('');
  const [randomBotAvaliableMoves, setRandomBotAvaliableMoves] = useState([]);
  const [boardSize, setBoardSize] = useState(460);
  const ref = useRef(null);

  useEffect(() => {
    setBoardSize(ref.current.offsetWidth);

  }, [])

  useEffect(() => {
    // Check for win
    if (chess.game_over()) {
      handleGameOver();
    }
  })

  // Add playermove to history
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

  // Add computer move to history
  const updateComputerHistory = (computerMove) => {
    const currentMove = movesHistory[movesHistory.length - 1];
    const newMove = { ...currentMove, computerMove: computerMove }
    movesHistory[movesHistory.length - 1] = newMove;
  }

  const handlePlayerMove = (playerMove) => {
    // Checks if playermove is valid
    if (chess.move(playerMove)) {

      // add move to history
      updatePlayerHistory(playerMove);

      // computer response random
      randomBot(chess, updateComputerHistory, setRandomBotAvaliableMoves, setFen)

      // update chessboard
      setFen(chess.fen());
    }
  }
  const resetGame = () => {
    // reset board and game
    setFen(startingFen);
    chess.reset();
    setMovesHistory([]);

    // close modal
    const modal = document.querySelector(".modal");
    modal.style.display = "none"
  }
  const handleGameOver = () => {
    // Check how game ended
    if (chess.in_checkmate()) {
      setGameOverText("Checkmate")
    }
    if (chess.in_draw()) {
      setGameOverText("Draw")
    }
    if (chess.in_stalemate()) {
      setGameOverText("Stalemate")
    }
    if (chess.in_threefold_repetition()) {
      setGameOverText("Threefold Repetition")
    }
    if (chess.insufficient_material()) {
      setGameOverText("Insufficient Material")
    }

    // Modal Logic
    const modal = document.querySelector(".modal");
    const closeBtn = document.querySelector(".close");
    modal.style.display = "block";
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none"
    })

  }


  return (
    <>
      <NavBar />
      <div className="app-container">
        <div class="modal">
          <div class="modal-content">
            <span class="close">&times;</span>
            <div className="modal-text">
              <h2>Game Over</h2>
              <p>{gameOverText}</p>
              <button className="button" onClick={(e) => { resetGame() }}>Play Again?</button>
            </div>
          </div>
        </div>
        <div className="chess-container">
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
          <DataVisualization selectedBot={selectedBot} randomBotAvaliableMoves={randomBotAvaliableMoves} />
        </div>
      </div>
    </>
  );
}

export default App;
