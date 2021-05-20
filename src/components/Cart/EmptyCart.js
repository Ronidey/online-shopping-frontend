import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function EmptyCart() {
  return (
    <div className='img-notify cart'>
      <div className='img-notify__img'>
        <img src='/images/empty-cart.svg' alt='' />
      </div>
      <div className='img-notify__text'>
        <h1>Empty Cart</h1>
        <p>Your cart is sad because it’s feeling so lonely :(</p>
        <Button
          to='/'
          variant='contained'
          size='large'
          style={{ background: '#f37256', color: '#fff' }}
          component={Link}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default EmptyCart;
