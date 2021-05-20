import React, { useState } from 'react';
import './ProductImgGroup.css';
import WishButton from '../WishButton';
import { makeStyles } from '@material-ui/core/styles';

function ProductImgGroup({ product }) {
  const [activeImg, setActiveImg] = useState(product.imgUrls[0]);

  const handleImgClick = (e) => {
    setActiveImg(e.currentTarget.dataset.url);
  };
  const classes = useStyles();

  return (
    <div className='product-img-group'>
      <div
        className={`product-img-lg img ${
          product.category === 'shoes' ? 'is-wide' : ''
        }`}
      >
        <WishButton productId={product._id} className={classes.btnWish} />

        <img src={activeImg} alt='' />
      </div>
      <div className='window-images'>
        {product.imgUrls.map((url, i) => (
          <div
            key={i}
            onClick={handleImgClick}
            data-url={url}
            className={`img-sm ${url === activeImg ? 'is-active' : ''}`}
          >
            <img src={url} alt='' />
          </div>
        ))}
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  btnWish: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    fontSize: '2rem'
  }
});

export default React.memo(ProductImgGroup);
