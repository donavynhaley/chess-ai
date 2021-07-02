import React from 'react'
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}


const Notification = ({text, severity, openAlert, setOpenAlert}) => {
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
      };
    
    return (
        <div>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose} TransitionComponent={SlideTransition}>

            </Snackbar>
        </div>
    )
}

export default Notification
