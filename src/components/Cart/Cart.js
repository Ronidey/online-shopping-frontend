import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../../AppContext';
import axios from 'axios';
import EmptyCart from './EmptyCart';
import Page from '../Page';
import MainHeader from '../MainHeader';
import Search from '../Search';
import Loader from '../Loader';
import Checkout from './Checkout';
import { deleteCartItem } from '../../requests';
import SelectedItem from '../SelectedItem';

function Cart() {
  const { appState, appDispatch } = useContext(AppContext);
  const [myCart, setMyCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  // Getting Cart
  useEffect(() => {
    if (appState.isLoggedIn) {
      const req = axios.CancelToken.source();

      axios
        .get(`/users/my-cart`, { cancelToken: req.token })
        .then((res) => {
          setMyCart(res.data.cart);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });

      return () => req.cancel();
    } else {
      setIsLoading(false);
    }
  }, [appState.isLoggedIn]);

  const changeItemQty = (productId, qty) => {
    axios.patch(`/users/my-cart/${productId}`, { qty }).catch((err) => {
      alert(err.response.data.error);
    });

    const cart = myCart.map((item) => {
      if (item.product._id == productId) {
        item.qty = qty;
      }
      return item;
    });

    setMyCart(cart);
  };

  useEffect(() => {
    if (myCart.length) {
      setTotalAmount(getTotalAmount(myCart));
    }
  }, [myCart]);

  const getTotalAmount = (cart) => {
    let amount = 0;

    for (let item of cart) {
      amount += item.product.currentPrice * item.qty;
    }
    return amount;
  };

  // Delete Cart Item
  const deleteFromCart = (productId) => {
    appDispatch({ type: 'processing', payload: true });

    deleteCartItem(productId)
      .then((res) => {
        const cart = myCart.filter((item) => item.product._id != productId);
        setMyCart(cart);
        appDispatch({ type: 'updateCart', payload: res.data.cart });
      })
      .catch((err) => {
        alert(err.response.data.error);
      })
      .finally(() => {
        appDispatch({ type: 'processing', payload: false });
      });
  };

  if (isLoading) return <Loader />;

  return (
    <Page title='My Cart'>
      <Search />
      <MainHeader />
      <main>
        {myCart.length ? (
          <section className='my-cart'>
            <div className='my-cart__container'>
              <header className='text-center'>
                <h2>My Cart</h2>
              </header>
              {myCart.map((item) => {
                return (
                  <SelectedItem
                    key={item._id}
                    {...item}
                    changeItemQty={changeItemQty}
                    removeItem={deleteFromCart}
                  />
                );
              })}
              <footer className='d-flex justify-content-end'>
                <Checkout totalAmount={totalAmount} />
              </footer>
            </div>
          </section>
        ) : (
          <EmptyCart />
        )}
      </main>
    </Page>
  );
}

export default Cart;
