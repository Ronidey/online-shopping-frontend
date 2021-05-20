import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
// import { makeStyles } from '@material-ui/styles';
import { HashLink as Link } from 'react-router-hash-link';
import './Banner.css';

function Banners() {
  const [show, setShow] = useState(false);
  // const classes = useStyles();

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

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//     height: '100vh',
//     overflow: 'hidden',
//     maxHeight: '800px',
//     position: 'relative',
//     backgroundColor: '#eeedf2'
//   },

//   banner: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover'
//   },

//   banner1: {
//     backgroundImage: "url('/images/banner-1.jpg')",
//     backgroundPosition: '80%',

//     '&::before': {
//       content: '""',
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: '#7e7eff54',

//       '@media (min-width: 992px)': {
//         display: 'none'
//       }
//     }
//   },

//   banner1Text: {
//     position: 'absolute',
//     bottom: '20%',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     width: '100%',
//     maxWidth: '600px',
//     textAlign: 'center',
//     padding: '1rem',
//     color: '#fff',

//     '@media (min-width: 992px)': {
//       left: '30%',
//       bottom: '25%',
//       right: 'initial',
//       top: 'initial',
//       color: '#425cc5'
//     }
//   },

//   banner2: {
//     backgroundImage: "url('/images/banner-2.jpg')",
//     backgroundPosition: '15%',

//     '&::before': {
//       content: '""',
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: '#c451ff26;',

//       '@media (min-width: 992px)': {
//         display: 'none'
//       }
//     }
//   },

//   banner2Text: {
//     position: 'absolute',
//     bottom: '20%',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     width: '100%',
//     maxWidth: '600px',
//     textAlign: 'center',
//     padding: '1rem',
//     color: '#fff',

//     '@media (min-width: 992px)': {
//       bottom: '30%',
//       left: '60%',
//       color: ' #bf3036'
//     }
//   },

//   heading: {
//     fontSize: '3.5rem',
//     fontWeight: 700,
//     textTransform: 'uppercase',
//     color: 'inherit',
//     textShadow: '0 0 2px rgba(0, 0, 0, 0.25)',
//     marginBottom: '1rem'
//   },

//   subHeading: {
//     fontSize: '1.5rem',
//     textTransform: 'capitalize',
//     color: '#fff',
//     marginBottom: '2rem',
//     fontWeight: 600,

//     '@media (min-width: 992px)': {
//       color: '#555'
//     }
//   },

//   btn: {
//     display: 'inline-block',
//     borderWidth: '2px',
//     borderStyle: 'solid',
//     borderColor: 'currentColor transparent',
//     fontSize: '1.35rem',
//     padding: '0.75rem 1rem',
//     background: 'transparent',
//     fontWeight: 600,
//     textTransform: 'uppercase',
//     color: 'inherit'
//   }
// });

export default React.memo(Banners);
