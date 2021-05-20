import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { makeStyles, withStyles } from '@material-ui/core/styles';

function Logo() {
  const classes = useStyles();
  return (
    <Link to='/' className={classes.root}>
      <span className={classes.logoText}>Online Shopping</span>
      <StyledShoppingBasketIcon className='Logo__icon' />
    </Link>
  );
}

const useStyles = makeStyles({
  root: {
    fontSize: '1.5rem',
    textDecoration: 'none',
    fontWeight: 600,
    color: 'var(--clr-primary)',
    display: 'flex',
    alignItems: 'center'
  },

  logoText: {
    display: 'none',

    '@media (min-width: 600px)': {
      display: 'inline-block'
    }
  }
});

const StyledShoppingBasketIcon = withStyles({
  root: {
    marginLeft: '0.5rem',
    transformOrigin: 'top center',
    fontSize: '1.75rem',
    animation: '$logoIconAnimate 5s ease-in-out infinite'
  },

  '@keyframes logoIconAnimate': {
    '0%, 100%': {
      transform: 'rotate(0deg)'
    },

    '10%': {
      transform: 'rotate(15deg)'
    },

    '20%': {
      transform: 'rotate(-15deg)'
    },

    '30%': {
      transform: 'rotate(10deg)'
    },

    '40%': {
      transform: 'rotate(-10deg)'
    },

    '50%': {
      transform: 'rotate(0)'
    }
  }
})(ShoppingBasketIcon);

export default Logo;
