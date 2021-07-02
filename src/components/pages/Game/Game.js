import React, { useState, useEffect, useRef } from 'react';
import Chessboard from 'chessboardjsx';
import Chess from "chess.js";
import MoveHistory from './MoveHistory';
import DataVisualization from './DataVisualization';
import NavBar from '../../common/NavBar';
import randomBot from '../../Bots/randomBot';
import MiniMax from '../../Bots/MiniMax';
import SimpleModal from '../../common/SimpleModel';
import Notification from '../../common/Notification';
import UndoMove from './UndoMove';
import axios from 'axios';

const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
const allBots = ["Random", "MiniMax", "AlphaBeta"]
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
    const [gameWon, setGameWon] = useState(false)
    const [randomBotAvaliableMoves, setRandomBotAvaliableMoves] = useState([]);
    const [treeData, setTreeData] = useState({})
    const [boardSize, setBoardSize] = useState(460);
    const [openModal, setOpenModal] = useState(false)
    const [depth, setDepth] = useState(allDepth[1])
    const [openAlert, setOpenAlert] = useState(false)
    const [alertText, setAlertText] = useState("")
    const [alertType, setAlertType] = useState("success")

    const ref = useRef(null);

    // updates board size
    useEffect(() => {
        console.log("resize")
        const handleBoardResize = () => {
            const width = ref.current.offsetWidth;
            if (width < 1200) {
                setBoardSize(width - 100);
            }
            else if (width <= 1920) {
                setBoardSize(width - 700)
            }
            else if (width >= 1800) {
                setBoardSize(width - 1000)
            }
            
            if(localStorage.getItem("token")){
                setIsLoggedIn(true)
            }
        }
        handleBoardResize()
        window.addEventListener('resize', handleBoardResize)
        return () => window.removeEventListener('resize', handleBoardResize);
    }, [])

    // updates board if new starting position is selected
    useEffect(() => {
        resetGame()
    }, [selectedPos])

    // checks for win
    useEffect(() => {
        if (chess.game_over()) {
            handleGameOver();
        }

    }, [movesHistory])

    // Pops up an alert
    const alert = (text, type) => {
        setAlertText(text)
        setAlertType(type)
        setOpenAlert(true)
    }
    // updates move history
    const updateHistory = () => {
        console.log(chess.history())
        setMovesHistory(chess.history());
    }

    // logic to undo a move
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

    // reset board and game
    const resetGame = () => {
        setFen(selectedPos);
        chess.load(selectedPos);
        setMovesHistory([]);
        setOpenModal(false)
    }

    // Handles game over and if user is logged in sends to backend
    const handleGameOver = () => {
        // Check who won
        if(chess.turn() === "b"){
            setGameWon(true)
        }
        else{
            setGameWon(false)
        }

        // Check how game ended
        if (chess.in_checkmate()) {
            setGameOverText("Checkmate")
        }
        else if (chess.in_draw()) {
            setGameOverText("Draw")
        }
        else if (chess.in_stalemate()) {
            setGameOverText("Stalemate")
        }
        else if (chess.in_threefold_repetition()) {
            setGameOverText("Threefold Repetition")
        }
        else if (chess.insufficient_material()) {
            setGameOverText("Insufficient Material")
        }

        // Open game over modal
        setOpenModal(true)

        // Send game to user is logged in backend
        if(isLoggedIn){
            postGame()
        }
        else{
            alert("Please Login to save game", "")
        }
    }

    // Sends game data to backend
    const postGame = () => {
      const data = {
          game:  {
            result: gameWon,
            botType: selectedBot,
            depth: depth,
            moves: movesHistory
          },
          email: localStorage.getItem('email')
    }

        const config = {
            headers: {
                'Authorization': `Basic ${localStorage.getItem("token")}`
            }
        } 
        const backend = axios.create({
            baseURL: process.env.REACT_APP_BE_URL
        })
        const promise = backend.post(
            `add-game`,
            data,
            config
        );
        promise
            .then(res => {
                alert("Game Saved", "")
                console.log(res.data)
            })
            .catch(e => {
                console.log(e)
            });
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
                alert={alert}
            />
            <Notification text={alertText} type={alertType} openAlert={openAlert} setOpenAlert={setOpenAlert}/>
            <div className="app-container">
                <SimpleModal openModal={openModal} setOpenModal={setOpenModal} title={`Game Over You ${gameWon? "Won" : "Lost"}`} desc={`The game ended with a ${gameOverText}`} onClick={resetGame} buttonText="Play Again?" />
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
