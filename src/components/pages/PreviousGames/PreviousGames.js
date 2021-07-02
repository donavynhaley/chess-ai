import React, {useEffect, useState} from 'react'
import NavBar from '../../common/NavBar'
import GameReacap from './GameRecap'
import axios from 'axios'
import Paper from '@material-ui/core/Paper';

// get history from backend
const PreviousGames = ({ isLoggedIn, setIsLoggedIn }) => {
    const [gameHistory, setGameHistory] = useState([])

    const getHistory = () => {
        const backend = axios.create({
            baseURL: process.env.REACT_APP_BE_URL
        })

        const promise = backend.get(
            `games`,
            {
                headers: {
                    'Authorization': `token ${localStorage.getItem('token')}`
                }
            }
        );

        promise
            .then(res => {
                console.log(res.data)
                setGameHistory(res.data.games)
                console.log(gameHistory)
            })
            .catch(e => {
                console.log(e)
            });
    
        return promise
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
                
                {gameHistory.map((game) => {
                    return <GameReacap result={game.result ? "Win" : "Loss"} botType={game.botType} depth={game.depth} moveHistory={game.moves} />
                })}
            </div>
        </>
    )
}

export default PreviousGames
