import React from 'react';
import Button from '@material-ui/core/Button';

function CheckoutSuccess() {
  return (
    <div className='img-notify checkout-success'>
      <div className='img-notify__img'>
        <img src='/images/order-confirm.svg' alt='' />
      </div>
      <div className='img-notify__text'>
        <h1>Order Successful</h1>
        <p>Thank you so much for your trust</p>
        <Button
          href='/'
          variant='contained'
          size='large'
          style={{
            background: '#3ad449',
            color: '#fff',
            marginRight: '0.75rem'
          }}
        >
          Home
        </Button>

        <Button
          href='/profile'
          variant='contained'
          size='large'
          style={{ background: '#444444', color: '#fff' }}
        >
          My Orders
        </Button>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
