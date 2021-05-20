import React from 'react';
import { Link } from 'react-router-dom';

function WishlistItem(props) {
  const { _id, product, deleteFromWishlist } = props;
  const { imgUrl, title, currentPrice } = product;

  console.log(props);

  const handleRemove = () => {
    deleteFromWishlist(_id);
  };

  return (
    <div className='wishlist-item d-flex align-items-center flex-wrap'>
      <button
        aria-label='remove item'
        title='remove item'
        className='wishlist-item__remove btn-icon'
        onClick={handleRemove}
      >
        X
      </button>
      <div className='wishlist-item__img'>
        <img src={imgUrl} alt='' />
      </div>
      <div className='wishlist-item__info'>
        <h4 className='wishlist-item__title'>
          {title.length > 30 ? title.slice(0, 30) + '...' : title}
        </h4>
        <span className='badge badge-green'>in stock</span>
        <p className='wishlist-item__price'>&#8377;{currentPrice}</p>
        <Link to={`/products/${_id}`} className='btn-add btn-sm btn-dark'>
          View item
        </Link>
      </div>
    </div>
  );
}

export default WishlistItem;
