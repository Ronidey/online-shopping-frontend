import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import { makeStyles } from '@material-ui/core/styles';
import StepLabel from '@material-ui/core/StepLabel';

function OrderTracking({ title, price, qty }) {
  const activeStep = 1;
  const steps = ['Order placed', 'Shipped to your city', 'Delivered'];
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header>
        <h5>{title}</h5>
        <p>
          <b>Price:</b> {price.toLocaleString()}
        </p>
        <p>
          <b>Qty:</b> {qty}
        </p>
      </header>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto 2rem',
    background: '#fff',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.15)',
    padding: '2rem',

    '& header': {
      color: '#464343',
      textAlign: 'center',
      marginBottom: '2rem',
      '& h5': {
        fontWeight: '600',
        fontSize: '1.25rem',
        color: 'var(--clr-primary)',
        fontFamily: 'sans-serif',
        textTransform: 'capitalize'
      },

      '& p': {
        marginBottom: '0.5rem'
      }
    }
  }
});

export default OrderTracking;
