import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import SimpleModal from './SimpleModel';
import LoginForm from './LoginForm';

const AvatarMenu = ({ isLoggedIn, setIsLoggedIn, alert }) => {
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
        if (selection === "Sign Out") {
            localStorage.removeItem("email")
            localStorage.removeItem("token")
            window.location.reload()
        }
    }

    const body = (
        <LoginForm isLogin={selected} setOpenModal={setOpenModal} setIsLoggedIn={setIsLoggedIn} alert={alert}/>
    )

    const loggedInMenu = ["Home", "Previous Games", "Sign Out"]
    const loggedOutMenu = ["Login", "Register"]

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
                {isLoggedIn ? loggedInMenu.map(item => {
                    return <MenuItem onClick={() => handleSeleciton(item)}>{item}</MenuItem>
                }) : loggedOutMenu.map(item => {
                    return <MenuItem onClick={() => handleSeleciton(item)}>{item}</MenuItem>
                })}
            </Menu>
        </div>
    )
}

export default AvatarMenu
