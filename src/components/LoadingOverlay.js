import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

function LoadingOverlay({ isProcessing }) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop className={classes.backdrop} open={isProcessing}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 999,
    color: '#fff'
  }
}));

export default LoadingOverlay;
