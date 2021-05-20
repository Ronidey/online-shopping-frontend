import React, { useEffect, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { useImmerReducer } from 'use-immer';

import AppContext from './AppContext';

// ------------ Components ----------
import Overview from './components/Overview/Overview';
import Wishlist from './components/Wishlist/Wishlist';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import LoadingOverlay from './components/LoadingOverlay';
import reducer from './reducer';

// ------------ Lazy Loading Components --------------
const SearchResults = React.lazy(() => import('./components/SearchResults'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
const PageNotFound = React.lazy(() => import('./components/PageNotFound'));
const CheckoutSuccess = React.lazy(() =>
  import('./components/CheckoutSuccess')
);
const SingleProduct = React.lazy(() =>
  import('./components/Product/SingleProduct')
);
const Cart = React.lazy(() => import('./components/Cart/Cart'));

axios.defaults.baseURL = '/api/v1';

function App() {
  // ------------- Initial State ---------------------
  const initialState = {
    collectionProducts: [],
    isSideNavOpen: false,
    isSearchOpen: false,
    isLoggedIn: false,
    isLoading: true,
    user: {
      wishlist: [],
      cart: []
    },
    addWishlistItemId: '',
    removeWishlistItemId: '',
    logoutReqCount: 0,
    isProcessing: false
  };

  const [appState, appDispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    if (appState.logoutReqCount) {
      appDispatch({ type: 'processing', payload: true });

      axios
        .post('/users/logout')
        .then(() => {
          appDispatch({ type: 'logoutSuccess' });
          appDispatch({ type: 'processing', payload: false });
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  }, [appState.logoutReqCount]);

  useEffect(() => {
    axios
      .get('/users/isAuthenticated')
      .then((res) => {
        if (res.data.user) {
          appDispatch({ type: 'login', payload: res.data.user });
        }
        appDispatch({ type: 'appLoaded' });
      })
      .catch((err) => {
        alert(err.response.data.error);
      });
  }, []);

  // Sending Request to Update Wishlist
  useEffect(() => {
    if (appState.wishlistReqCount) {
      axios
        .patch(`/users/my-wishlist/${appState.wishlistReqItemId}`)
        .then((res) =>
          appState.appDispatch({
            type: 'updateWishlist',
            payload: res.data.wishlist
          })
        )
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  }, [appState.wishlistReqCount]);

  useEffect(() => {
    if (appState.addWishlistItemId !== '') {
      axios
        .post(`/users/my-wishlist/${appState.addWishlistItemId}`)
        .then((res) => {
          appDispatch({ type: 'updateWishlist', payload: res.data.wishlist });
          appDispatch({ type: 'addItemToWishlist', payload: '' });
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  }, [appState.addWishlistItemId]);

  useEffect(() => {
    if (appState.removeWishlistItemId !== '') {
      axios
        .delete(`/users/my-wishlist/${appState.removeWishlistItemId}`)
        .then((res) => {
          appDispatch({ type: 'updateWishlist', payload: res.data.wishlist });
          appDispatch({ type: 'removeItemFromWishlist', payload: '' });
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    }
  }, [appState.removeWishlistItemId]);

  if (appState.isLoading) return null;

  return (
    <>
      <AppContext.Provider value={{ appState, appDispatch }}>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path='/'>
              <Overview />
            </Route>
            <Route path='/search'>
              <SearchResults />
            </Route>
            <Route path='/products/:id'>
              <SingleProduct />
            </Route>
            <Route path='/my-cart'>
              <Cart />
            </Route>
            <Route path='/my-wishlist'>
              <Wishlist />
            </Route>
            <ProtectedRoute path='/profile'>
              <Profile />
            </ProtectedRoute>
            <Route path='/login'>
              {appState.isLoggedIn ? <Redirect to='/' /> : <Login />}
            </Route>
            <Route path='/signup'>
              {appState.isLoggedIn ? <Redirect to='/' /> : <Signup />}
            </Route>
            <Route path='/checkout-success'>
              <CheckoutSuccess />
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </Suspense>
      </AppContext.Provider>
      {appState.isProcessing && (
        <LoadingOverlay isProcessing={appState.isProcessing} />
      )}
    </>
  );
}

export default App;
