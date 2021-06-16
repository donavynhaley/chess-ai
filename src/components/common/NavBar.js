import React from 'react'
import Selection from './Selection'
const NavBar = (props) => {
    const {
        selectedBot,
        setSelectedBot,
        allBots,
        selectedPos,
        setSelectedPos,
        allStartingPositions,
    } = props;
    return (
        <div className="navbar">
            <h1>Chess AI</h1>
            <Selection selected={selectedBot} setSelected={setSelectedBot} allOptions={allBots} title={"Select Bot"} />
            <Selection selected={selectedPos} setSelected={setSelectedPos} allOptions={allStartingPositions} title={"Starting Position"} />
        </div>
    )
}

export default NavBar
