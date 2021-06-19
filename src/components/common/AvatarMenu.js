import React, { useState } from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

const AvatarMenu = () => {
    const [openMenu, setOpenMenu] = useState();

    const handleClick = (e) => {
        setOpenMenu(e.currentTarget)
    }

    const handleClose = () => {
        setOpenMenu(false)
    }
    return (
        <div>
            <Avatar aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
            <Menu
                id="simple-menu"
                anchorEl={openMenu}
                keepMounted
                open={Boolean(openMenu)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Previous Games</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default AvatarMenu
