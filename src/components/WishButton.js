import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../AppContext';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

function WishButton(props) {
  const history = useHistory();
  const { appState, appDispatch } = useContext(AppContext);
  const isInWishlist = appState.user.wishlist.find(
    (item) => item.product == props.productId
  );

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    // ------- Redirect is User is NOT Logged in ----------
    if (!appState.isLoggedIn) {
      return history.push(
        `/login?error=${encodeURIComponent(
          'You are not logged in! Please login first'
        )}`
      );
    }
    appDispatch({ type: 'addItemToWishlist', payload: props.productId });
  };

  const handleRemoveFromWishlist = (e) => {
    e.preventDefault();
    appDispatch({ type: 'removeItemFromWishlist', payload: props.productId });
  };

  return (
    <div>
      {isInWishlist ? (
        <IconButton
          color='secondary'
          aria-label='upload picture'
          component='span'
          onClick={handleRemoveFromWishlist}
          className={props.className}
        >
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton
          color='secondary'
          aria-label='upload picture'
          component='span'
          onClick={handleAddToWishlist}
          className={props.className}
        >
          <FavoriteBorderIcon />
        </IconButton>
      )}
    </div>
  );
}

export default WishButton;
