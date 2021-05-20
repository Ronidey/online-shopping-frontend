import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function EmptyWishlist() {
  return (
    <div className='img-notify wishlist'>
      <div className='img-notify__img'>
        <img src='/images/empty-wishlist.svg' alt='' />
      </div>
      <div className='img-notify__text'>
        <h1>Empty Wishlist</h1>
        <p>Your wishlist has 0 items</p>
        <Button
          to='/'
          variant='contained'
          size='large'
          style={{ background: '#f097ff', color: '#fff' }}
          component={Link}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default EmptyWishlist;
