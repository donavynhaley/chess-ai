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

const Selection = (props) => {
    const { selected, setSelected, allOptions, title } = props;
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleChange = (event) => {
        setSelected(event.target.value);
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
                    <InputLabel className={classes.select} id="select-label">{title}</InputLabel>
                    <Select
                        labelId="select-label"
                        id="open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={selected}
                        onChange={handleChange}
                        className={classes.select}
                    >
                        {allOptions && allOptions.map((option, key) => {
                            if (typeof (option) == "string" || typeof (option) == "number") {
                                return <MenuItem key={key} value={option}>{option}</MenuItem>

                            }
                            else {
                                return <MenuItem key={key} value={option.fen}>{option.name}</MenuItem>
                            }
                        })}
                    </Select>
                </div>
            </FormControl>
        </div>
    )
}

export default Selection
