import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AppContext from '../AppContext';
import Loader from './Loader';

function ProtectedRoute({ children, ...rest }) {
  const { appState } = useContext(AppContext);

  if (appState.fetchingUserData) return <Loader />;

  if (appState.isLoggedIn) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return <Redirect to='/login' />;
  }
}

export default ProtectedRoute;
