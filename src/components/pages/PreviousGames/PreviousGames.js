import React from 'react'
import NavBar from '../../common/NavBar'
import GameReacap from './GameRecap'
const PreviousGames = ({ isLoggedIn, setIsLoggedIn }) => {
    const getHistory = () => {
        // get history from backend
    }

    const moveHistory = [{ computerMove: "Nc6", playerMove: "f3" }, { computerMove: "Rb8", playerMove: "e4" }, { computerMove: "Ra8", playerMove: "Bc4" }, { computerMove: "Rb8", playerMove: "d4" }, { computerMove: "Ne5", playerMove: "d5" }, { computerMove: "Nxc4", playerMove: "Qd4" }]
    return (

        <>
            <NavBar className="nav-full" isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className="prev-games">
                <h2>Previous Games</h2>
                <GameReacap result={"Win"} botType={"MiniMax"} depth={"3"} moveHistory={moveHistory} />
            </div>
        </>
    )
}

export default PreviousGames
