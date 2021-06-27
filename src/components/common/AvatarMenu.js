import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import SimpleModal from './SimpleModel';
import LoginForm from './LoginForm';

const AvatarMenu = ({ isLoggedIn, setIsLoggedIn }) => {
    const [openMenu, setOpenMenu] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [selected, setSelected] = useState("")
    const history = useHistory();

    const handleClick = (e) => {
        setOpenMenu(e.currentTarget)
    }

    const handleClose = () => {
        setOpenMenu(false)
    }

    const handleSeleciton = (selection) => {
        setSelected(selection)
        if (selection === "Login" || selection === "Register") {
            handleClose()
            setOpenModal(true);
        }
        if (selection === "Home") {
            history.push("/")
        }
        if (selection === "Previous Games") {
            history.push("/games")
        }
    }

    const body = (
        <LoginForm isLogin={selected} setOpenModal={setOpenModal} setIsLoggedIn={setIsLoggedIn} />
    )
    return (
        <div>
            <SimpleModal openModal={openModal} setOpenModal={setOpenModal} title={selected} desc={body} />
            <Avatar aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
            <Menu
                id="simple-menu"
                anchorEl={openMenu}
                keepMounted
                open={Boolean(openMenu)}
                onClose={handleClose}
            >
                {isLoggedIn ? (
                    <>
                        <MenuItem onClick={() => handleSeleciton("Home")}>Home</MenuItem>
                        <MenuItem onClick={() => handleSeleciton("Previous Games")}>Previous Games</MenuItem>
                        <MenuItem onClick={() => handleSeleciton("Sign Out")}>Sign Out</MenuItem>
                    </>
                ) :
                    (
                        <>
                            <MenuItem onClick={() => handleSeleciton("Login")}>Login</MenuItem>
                            <MenuItem onClick={() => handleSeleciton("Register")}>Register</MenuItem>
                        </>
                    )}
            </Menu>
        </div>
    )
}

export default AvatarMenu
