import React, {useEffect} from 'react'
import NavBar from '../../common/NavBar'
import GameReacap from './GameRecap'
const PreviousGames = ({ isLoggedIn, setIsLoggedIn }) => {
    const getHistory = () => {
        // get history from backend
    }

    useEffect(() => {
        getHistory()
    }, [])
    
    const moveHistory = ["Nc6", "f3", "Rb8", "e4",  "Ra8", "Bc4" , "Rb8", "d4" ,"Ne5", "d5", "Nxc4", "Qd4" ]
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
