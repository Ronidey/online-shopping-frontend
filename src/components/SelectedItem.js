import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SelectItemQty from './SelectItemQty';

function SelectedItem(props) {
  const { product, size, qty, changeItemQty, removeItem } = props;

  const handleRemove = (e) => {
    const verify = window.confirm('Do you want to Remove this product?');

    if (verify) {
      removeItem(product._id);
    }
  };

  const handleItemQtyChange = (qty) => {
    changeItemQty(product._id, qty);
  };

  return (
    <div className='cart-item d-flex align-items-center flex-wrap'>
      <Link to={`/products/${product._id}`} className='cart-item__img'>
        <img src={product.imgUrl} alt={product.title} />
      </Link>
      <div className='cart-item__info'>
        <Link to={`/products/${product._id}`}>
          <h4 className='cart-item__title text-capitalize'>
            {product.title.length > 30
              ? product.title.slice(0, 30) + '...'
              : product.title}{' '}
            <small>(size: {size})</small>
          </h4>
          <span className='badge badge-green'>in stock</span>
        </Link>
        {qty && (
          <SelectItemQty qty={qty} handleItemQtyChange={handleItemQtyChange} />
        )}
        <div className='cart-item__price'>
          &#8377; {product.currentPrice.toLocaleString()}
        </div>
        <Button variant='contained' color='secondary' onClick={handleRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
}

export default SelectedItem;
