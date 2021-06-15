import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../AppContext';
import EmptyWishlist from './EmptyWishlist';
import MainHeader from '../MainHeader';
import Page from '../Page';
import Search from '../Search';
import axios from 'axios';
import Loader from '../Loader';
import SelectedItem from '../SelectedItem';

function Wishlist() {
  const { appDispatch, appState } = useContext(AppContext);
  const [myWishlist, setMyWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Getting Wishlist
  useEffect(() => {
    if (appState.isLoggedIn) {
      const req = axios.CancelToken.source();

      axios
        .get(`/users/my-wishlist`, { cancelToken: req.token })
        .then((res) => {
          setMyWishlist(res.data.wishlist);
          setIsLoading(false);
        })
        .catch((err) => {
          if (!axios.isCancel(req)) {
            alert(err.response.data.error);
          }
        });

      return () => req.cancel();
    } else {
      setIsLoading(false);
    }
  }, [appState.isLoggedIn]);

  // Delete Wishlist Item
  const removeFromWishlist = (productId) => {
    const filteredWishlist = myWishlist.filter(
      (el) => el.product._id != productId
    );

    // 1 Removing product from wishlist (wishlist page, populated results)
    setMyWishlist(filteredWishlist);
    // 2 Removing wishlist item from App state (unpopulated results)
    appDispatch({ type: 'removeItemFromWishlist', payload: productId });
  };

  if (isLoading) return <Loader />;

  return (
    <Page title='My Wishlist'>
      <Search />
      <MainHeader />
      <main>
        {myWishlist.length ? (
          <section className='my-wishlist'>
            <div className='my-wishlist__container'>
              <header className='text-center'>
                <h2>My Wishlist</h2>
              </header>
              <div>
                {myWishlist.map((item) => (
                  <SelectedItem
                    key={item._id}
                    {...item}
                    removeItem={removeFromWishlist}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <EmptyWishlist />
        )}
      </main>
    </Page>
  );
}

export default Wishlist;
