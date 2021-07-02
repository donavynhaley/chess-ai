import React from 'react'
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckIcon from '@material-ui/icons/Check';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}


const Notification = ({text, type, openAlert, setOpenAlert}) => {
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
      };
    const action = (
        <Button color="secondary" size="small" onClick={handleClose}>
            X
        </Button>
    )

    return (
        <div >
            <Snackbar 
            open={openAlert} 
            autoHideDuration={6000} 
            onClose={handleClose} 
            TransitionComponent={SlideTransition} 
            className={`alert ${type}`}
            >
                <SnackbarContent message={
                    <>
                    {type.length > 0 ? <div>{type == "success" ? <CheckIcon/> : <ErrorOutlineIcon/>}</div> : null}
                    <div>{text}</div>
                    </>
                }
                    action={action} />
            </Snackbar>
        </div>
    )
}

export default Notification
