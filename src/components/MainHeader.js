import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import User from './User';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import AppContext from '../AppContext';
import Logo from './Logo';
import './MainHeader.css';

function MainHeader() {
  const { appState, appDispatch } = useContext(AppContext);

  const openSearch = () => {
    appDispatch({ type: 'openSearch' });
  };

  return (
    <header className='MainHeader'>
      <Container maxWidth='lg'>
        <div className='MainHeader__container'>
          <Logo />

          <div className='MainHeader__right'>
            <Tooltip title='Wishlist'>
              <IconButton
                to='/my-wishlist'
                aria-label={`show ${appState.user.wishlist.length} cart items`}
                component={Link}
              >
                <Badge
                  badgeContent={appState.user.wishlist.length}
                  color='secondary'
                >
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title='Search'>
              <IconButton onClick={openSearch}>
                <SearchOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Cart'>
              <IconButton
                to='/my-cart'
                aria-label={`show ${appState.user.cart.length} cart items`}
                component={Link}
              >
                <Badge
                  badgeContent={appState.user.cart.length}
                  color='secondary'
                >
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <User />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default MainHeader;
