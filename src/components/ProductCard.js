import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition } from 'react-transition-group';
import './ProductCard.css';
import WishButton from './WishButton';

function ProductCard({ product }) {
  const [show, setShow] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const classes = useStyles();

  const imgStyle = {
    height: '100%',
    objectFit: product.category === 'shoes' ? 'contain' : 'cover',
    display: imgLoaded ? 'inline-block' : 'none'
  };

  const spinnerStyle = {
    width: '100px',
    height: '100px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: '0.5',
    display: imgLoaded ? 'none' : 'inline-block'
  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <CSSTransition timeout={1000} in={show} classNames='ProductCardWrapper'>
      <Link to={`/products/${product._id}`} className={classes.root}>
        <div className='ProductCard'>
          <WishButton className={classes.btnWish} productId={product._id} />
          <div className='ProductCard__img'>
            <img
              style={imgStyle}
              src={product.imgUrl}
              alt=''
              onLoad={() => setImgLoaded(true)}
            />
            <img style={spinnerStyle} src='/images/spinner.gif' />
          </div>
          <div className='ProductCard__info'>
            <h6 className='title'>
              {product.title.length > 25
                ? product.title.slice(0, 25) + '...'
                : product.title}
            </h6>
            <div>
              <span className='price'>
                &#8377;{product.currentPrice.toLocaleString()}
              </span>
              <span className='price--del'>
                &#8377;{product.oldPrice.toLocaleString()}
              </span>
              <span className='discount'>&nbsp;{product.off}% off</span>
            </div>
          </div>
        </div>
      </Link>
    </CSSTransition>
  );
}

const useStyles = makeStyles({
  root: {
    '&:hover $btnWish': {
      opacity: 1
    }
  },
  btnWish: {
    opacity: 0,
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    zIndex: 1
  }
});

export default ProductCard;
