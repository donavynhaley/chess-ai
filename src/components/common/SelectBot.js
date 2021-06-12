import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
        color: 'white',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    select: {
        color: 'white',
        minWidth: 120,
    }
}));

const SelectBot = (props) => {
    const { selectedBot, setSelectedBot, allBots } = props.props;
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleChange = (event) => {
        setSelectedBot(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div className="select-bot-container">

            <FormControl className={classes.formControl}>
                <div>
                    <InputLabel className={classes.select} id="select-label">Select a bot</InputLabel>
                    <Select
                        labelId="select-label"
                        id="open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={selectedBot}
                        onChange={handleChange}
                        className={classes.select}
                    >
                        {allBots && allBots.map((bot) => {
                            return <MenuItem value={bot}>{bot}</MenuItem>
                        })}
                    </Select>
                </div>
            </FormControl>
        </div>
    )
}

export default SelectBot
