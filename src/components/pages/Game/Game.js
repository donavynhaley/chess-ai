import React, { useState, useEffect, useRef } from 'react'
import Chessboard from 'chessboardjsx';
import Chess from "chess.js";
import MoveHistory from './MoveHistory';
import DataVisualization from './DataVisualization';
import NavBar from '../../common/NavBar';
import randomBot from '../../Bots/randomBot';
import MiniMax from '../../Bots/MiniMax';
import SimpleModal from '../../common/SimpleModel';
import UndoMove from './UndoMove';

const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
const allBots = ["Random", "MiniMax", "AlphaBeta", "Stockfish"]
const allStartingPositions = [
    { name: "Start", fen: startingFen },
    { name: "Caro-Kann Defense", fen: "rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1" },
    { name: "Pirc Defense", fen: "rnbqkbnr/ppp1pppp/3p4/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1" },
    { name: "Sicilian Defense", fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 1" },
    { name: "French Defense", fen: "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1" },
]
const allDepth = [1, 2, 3]
function Game({ isLoggedIn, setIsLoggedIn }) {
    const [chess] = useState(new Chess(startingFen));
    const [fen, setFen] = useState(chess.fen());
    const [movesHistory, setMovesHistory] = useState([]);
    const [selectedBot, setSelectedBot] = useState(allBots[1]);
    const [selectedPos, setSelectedPos] = useState(allStartingPositions[0].fen)
    const [evalCount, setEvalCount] = useState(0)
    const [gameOverText, setGameOverText] = useState('');
    const [randomBotAvaliableMoves, setRandomBotAvaliableMoves] = useState([]);
    const [treeData, setTreeData] = useState({})
    const [boardSize, setBoardSize] = useState(460);
    const [openModal, setOpenModal] = useState(false)
    const [depth, setDepth] = useState(allDepth[1])
    const ref = useRef(null);

    useEffect(() => {
        const width = ref.current.offsetWidth;
        if (width < 800) {
            setBoardSize(width - 200);
        }
        else if (width < 1200) {
            setBoardSize(width - 550)
        }
    }, [])

    useEffect(() => {
        resetGame()
    }, [selectedPos])

    useEffect(() => {
        // Check for win
        if (chess.game_over()) {
            handleGameOver();
        }
    })


    const updateHistory = () => {
        console.log(chess.history())
        setMovesHistory(chess.history());
    }

    const undo = () => {
        chess.undo()
        chess.undo()
        setFen(chess.fen);
        updateHistory();
    }

    // Handles player move and calls bots move
    const handlePlayerMove = (playerMove) => {
        // Checks if playermove is valid
        if (chess.move(playerMove)) {
            // update chessboard
            setFen(chess.fen());

            // computer response random
            if (selectedBot === allBots[0]) {
                randomBot(chess, updateHistory, setRandomBotAvaliableMoves, setFen)
            }
            else if (selectedBot === allBots[1]) {
                MiniMax(chess, updateHistory, setFen, setEvalCount, setTreeData, depth)
            }
        }
    }

    const resetGame = () => {
        // reset board and game
        setFen(selectedPos);
        chess.load(selectedPos);
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
            <NavBar
                selectedBot={selectedBot}
                setSelectedBot={setSelectedBot}
                allBots={allBots}
                selectedPos={selectedPos}
                setSelectedPos={setSelectedPos}
                allStartingPositions={allStartingPositions}
                depth={depth}
                setDepth={setDepth}
                allDepth={allDepth}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
            />
            <div className="app-container">
                <SimpleModal openModal={openModal} setOpenModal={setOpenModal} title={"Game Over"} desc={`The game ended with a ${gameOverText}`} onClick={resetGame} buttonText="Play Again?" />
                <div className="chess-container" ref={ref}>
                    <Chessboard
                        width={boardSize}
                        position={fen}
                        onDrop={(move) => handlePlayerMove({
                            from: move.sourceSquare,
                            to: move.targetSquare,
                            promotion: "q",
                        })}
                        className={"test"}
                    />
                </div>
                <div className="utility-container">
                    <MoveHistory movesHistory={movesHistory} />
                    <UndoMove undo={undo} />
                    <DataVisualization selectedBot={selectedBot} randomBotAvaliableMoves={randomBotAvaliableMoves} allBots={allBots} evalCount={evalCount} treeData={treeData} />
                </div>
            </div>
        </>
    );
}

export default Game;
