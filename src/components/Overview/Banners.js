import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import { HashLink as Link } from 'react-router-hash-link';
import './Banner.css';

function Banners() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer;

    timer = setTimeout(() => {
      setShow(!show);
    }, 10000);

    return () => clearTimeout(timer);
  }, [show]);

  useEffect(() => {
    setShow(!show);
  }, []);

  useEffect(() => {
    let timer;

    timer = setTimeout(() => {
      setShow(!show);
    }, 10000);

    return () => clearTimeout(timer);
  }, [show]);

  return (
    <div className='Banners'>
      <CSSTransition
        in={show}
        timeout={1000}
        classNames='banner-slider'
        unmountOnExit
      >
        <div className='banner banner-1'>
          <div className='banner-1__text'>
            <h1 className='banner__heading'>Wear The Fashion</h1>
            <p className='banner__subheading'>
              Best Offers on your favourite Brands, So what are you waiting for?
            </p>
            <Link className='banner__btn' to='#collection'>
              Shop Now
            </Link>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition
        in={!show}
        timeout={1000}
        classNames='banner-slider'
        unmountOnExit
      >
        <div className='banner banner-2'>
          <div className='banner-2__text'>
            <h1 className='banner__heading'>Create your own style</h1>
            <p className='banner__subheading'>
              Get the best deal for you! We have all the latest collections,
              Hurry up!!
            </p>
            <Link className='banner__btn' to='#collection'>
              Shop Now
            </Link>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

export default React.memo(Banners);
