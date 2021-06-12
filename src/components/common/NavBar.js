import React from 'react'
import SelectBot from './SelectBot'
const NavBar = (props) => {
    return (
        <div className="navbar">
            <h1>Chess AI</h1>
            <SelectBot props={props} />
        </div>
    )
}

export default NavBar
