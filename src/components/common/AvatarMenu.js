import React, { useState, useEffect } from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import SimpleModal from './SimpleModel'
import LoginForm from './LoginForm'

const AvatarMenu = () => {
    const [openMenu, setOpenMenu] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [selected, setSelected] = useState("")

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
    }

    const body = (
        <LoginForm isLogin={selected} setOpenModal={setOpenModal} />
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
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Previous Games</MenuItem> */}
                <MenuItem onClick={() => handleSeleciton("Login")}>Login</MenuItem>
                <MenuItem onClick={() => handleSeleciton("Register")}>Register</MenuItem>
                <MenuItem onClick={() => handleSeleciton("Previous Games")}>Previous Games</MenuItem>
            </Menu>
        </div>
    )
}

export default AvatarMenu
