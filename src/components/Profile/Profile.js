import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../../AppContext';
import Page from '../Page';
import { BiUser } from 'react-icons/bi';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import ProfileMenu from './ProfileMenu';
import OrderTracking from './OrderTracking';
import Button from '@material-ui/core/Button';
import Loader from '../Loader';
import './Profile.css';

function Profile() {
  const { appState, appDispatch } = useContext(AppContext);
  const user = appState.user;
  const [fetchingOrders, setFetchingOrders] = useState(true);
  const [myOrders, setMyOrders] = useState([]);
  const [deleteAcReqCount, setDeleteAcReqCount] = useState(0);

  // Getting All Orders History
  useState(() => {
    const ourRequest = axios.CancelToken.source();

    axios
      .get('/my-orders', { cancelToken: ourRequest.token })
      .then((res) => {
        setMyOrders(res.data.orders);
        setFetchingOrders(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          alert(err.response.data.error);
        }
      });

    return () => ourRequest.cancel();
  }, []);

  // Delete Account
  const handleDeleteAccount = (e) => {
    e.preventDefault();

    const verify = window.confirm('Do you want to DELETE your account?');
    if (verify) setDeleteAcReqCount(deleteAcReqCount + 1);
  };

  useEffect(() => {
    if (deleteAcReqCount) {
      const ourRequest = axios.CancelToken.source();

      axios
        .delete('/users/profile', {}, { cancelToken: ourRequest.token })
        .then(() => {
          window.location.href = '/';
        })
        .catch((err) => {
          if (!axios.isCancel(err)) {
            alert(err.response.data.error);
          }
        });

      return () => ourRequest.cancel();
    }
  }, [deleteAcReqCount]);

  // Handle Logout
  const handleLogout = () => {
    if (window.confirm('Do you want to logout?')) {
      appDispatch({ type: 'logout' });
    }
  };

  // Order Tracking Templates
  const ordersHistory = myOrders.length ? (
    myOrders.map((order) => (
      <OrderTracking key={order._id} {...order.product} />
    ))
  ) : (
    <div className='no-orders'>
      <h2>You have not ordered anything yet!</h2>
      <Button
        to='/'
        variant='contained'
        size='large'
        style={{ background: 'var(--clr-primary)', color: '#fff' }}
        component={Link}
      >
        Go Back Home
      </Button>
    </div>
  );

  if (fetchingOrders) return <Loader />;

  return (
    <Page title='My Profile'>
      <main>
        <section className='profile'>
          <div className='profile-grid'>
            <div className='profile-grid__col d-flex flex-column'>
              <header className='d-flex align-items-center justify-content-between'>
                <Link to='/' className='btn-go-home d-flex align-items-center'>
                  <AiOutlineArrowLeft />
                  <span>Go Home</span>
                </Link>

                <ProfileMenu
                  handleDeleteAccount={handleDeleteAccount}
                  handleLogout={handleLogout}
                />
              </header>

              <div className='user-container flex-grow-1'>
                <div className='user'>
                  <div style={{ fontSize: '5rem', lineHeight: 0 }}>
                    <BiUser />
                  </div>
                  <div className='user__text'>
                    <div className='user__name text-capitalize'>
                      {user.firstName + ' ' + user.lastName}
                    </div>
                    <div className='user__email'>{user.email}</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }} className='profile-grid__col'>
              {ordersHistory}
            </div>
          </div>
        </section>
      </main>
    </Page>
  );
}

export default Profile;
