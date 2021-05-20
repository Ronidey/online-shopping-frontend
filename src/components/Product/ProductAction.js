import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';

function ProductAction({
  addToCart,
  deleteFromCart,
  isInCart,
  handleBuyClick
}) {
  return (
    <div className='text-center'>
      {isInCart ? (
        <Button
          variant='contained'
          size='large'
          onClick={deleteFromCart}
          color='primary'
        >
          Remove
        </Button>
      ) : (
        <Button
          variant='contained'
          color='primary'
          size='large'
          onClick={addToCart}
        >
          Add To Cart
        </Button>
      )}
      <Button
        variant='contained'
        size='large'
        onClick={handleBuyClick}
        color='secondary'
      >
        Buy Now
      </Button>
    </div>
  );
}

export default ProductAction;
