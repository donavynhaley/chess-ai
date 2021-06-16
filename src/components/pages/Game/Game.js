import React, { useState, useEffect, useRef } from 'react'
import Chessboard from 'chessboardjsx';
import Chess from "chess.js";
import MoveHistory from './MoveHistory';
import DataVisualization from './DataVisualization';
import NavBar from '../../common/NavBar';
import randomBot from '../../bots/randomBot';
import MiniMax from '../../bots/MiniMax'
import SimpleModal from '../../common/SimpleModel';

const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
const allBots = ["Random", "MiniMax", "AlphaBeta", "Stockfish"]
const allStartingPositions = [
    { name: "Start", fen: startingFen },
    { name: "Ruy Lopez", fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1" },
    { name: "Italian Game", fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1" },
    { name: "Sicilian Defense", fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 1" },
    { name: "French Defense", fen: "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1" },
]
function Game() {
    const [chess] = useState(new Chess(startingFen));
    const [fen, setFen] = useState(chess.fen());
    const [movesHistory, setMovesHistory] = useState([]);
    const [selectedBot, setSelectedBot] = useState(allBots[1]);
    const [selectedPos, setSelectedPos] = useState(allStartingPositions[0])
    const [gameOverText, setGameOverText] = useState('');
    const [randomBotAvaliableMoves, setRandomBotAvaliableMoves] = useState([""]);
    const [boardSize, setBoardSize] = useState(460);
    const [openModal, setOpenModal] = useState(false)
    const ref = useRef(null);

    useEffect(() => {
        setBoardSize(ref.current.offsetWidth - 40);

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

    // Handles player move and calls bots move
    const handlePlayerMove = (playerMove) => {
        // Checks if playermove is valid
        if (chess.move(playerMove)) {
            // add move to history
            updatePlayerHistory(playerMove);

            // update chessboard
            setFen(chess.fen());

            // computer response random
            if (selectedBot === allBots[0]) {
                randomBot(chess, updateComputerHistory, setRandomBotAvaliableMoves, setFen)
            }
            else if (selectedBot === allBots[1]) {
                MiniMax(chess, updateComputerHistory, setFen)
            }


        }
    }

    const resetGame = () => {
        // reset board and game
        setFen(selectedPos);
        chess.reset();
        setMovesHistory([]);
        setOpenModal(false)
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

        // Open game over modal
        setOpenModal(true)

    }


    return (
        <>
            <NavBar selectedBot={selectedBot} setSelectedBot={setSelectedBot} allBots={allBots} />
            <div className="app-container">
                <SimpleModal openModal={openModal} setOpenModal={setOpenModal} resetGame={resetGame} title={"Game Over"} desc={`The game ended with a ${gameOverText}`} />
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

export default Game;
