import React from 'react'
import Selection from './Selection'
import AvatarMenu from './AvatarMenu'

const NavBar = (props) => {
    const {
        selectedBot,
        setSelectedBot,
        allBots,
        selectedPos,
        setSelectedPos,
        allStartingPositions,
        depth,
        setDepth,
        allDepth,
        className,
        isLoggedIn,
        setIsLoggedIn
    } = props;
    return (
        <div className={`navbar ${className}`}>
            <h1>Chess AI</h1>
            {selectedBot ? <div className="selections">
                <Selection selected={selectedBot} setSelected={setSelectedBot} allOptions={allBots} title={"Select Bot"} />
                <Selection selected={selectedPos} setSelected={setSelectedPos} allOptions={allStartingPositions} title={"Starting Position"} />
                <Selection selected={depth} setSelected={setDepth} allOptions={allDepth} title={"Algorithim Depth"} />
            </div> : null}

            <AvatarMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
    )
}

export default NavBar
