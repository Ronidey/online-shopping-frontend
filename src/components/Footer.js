import React from 'react';
import {
  GrFacebookOption,
  GrInstagram,
  GrTwitter,
  GrPinterest
} from 'react-icons/gr';
import { HashLink as Link } from 'react-router-hash-link';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer' id='footer'>
      <div className='container footer__container d-flex flex-wrap'>
        <div className='footer__col'>
          <h5>Go to</h5>
          <ul className='footer-links-menu'>
            <li>
              <Link to='#home'>Home</Link>
            </li>
            <li>
              <Link to='#products'>Products</Link>
            </li>
            <li>
              <Link to='#bestSelling'>Popular</Link>
            </li>
            <li>
              <Link to='#testimonials'>Reviews</Link>
            </li>
          </ul>
        </div>

        <div className='footer__col'>
          <h5>Help</h5>
          <ul className='footer-links-menu'>
            <li>
              <Link to='#'>Order tracking</Link>
            </li>
            <li>
              <Link to='#'>FAQ's</Link>
            </li>
            <li>
              <Link to='#'>Privacy policy</Link>
            </li>
            <li>
              <Link to='#'>Terms & conditions</Link>
            </li>
          </ul>
        </div>

        <div className='footer__col'>
          <h5>Follow us</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias,
            culpa! Asperiores omnis repellat cupiditate assumenda.
          </p>

          <div className='follow-us'>
            <Link to='#'>
              <GrFacebookOption />
            </Link>
            <Link to='#'>
              <GrInstagram />
            </Link>
            <Link to='#'>
              <GrTwitter />
            </Link>
            <Link to='#'>
              <GrPinterest />
            </Link>
          </div>
        </div>
      </div>
      <div className='footer__bottom'>
        <p>&copy;2021 OnlineShopping. All rights are reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
