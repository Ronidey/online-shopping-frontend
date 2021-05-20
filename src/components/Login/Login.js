import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Page from '../Page';
import AppContext from '../../AppContext';
import { withRouter } from 'react-router-dom';
import { queryToObj } from '../../helper';
import MainHeader from '../MainHeader';
import './Form.css';

function Login(props) {
  const { appDispatch } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [redirectError, setRedirectError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const queryObj = queryToObj(props.location.search);
  const classes = useStyles();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await axios.post('/users/login', { email, password });
      appDispatch({ type: 'login', payload: res.data.user });
      props.history.push('/');
    } catch (err) {
      setIsProcessing(false);
      alert(err.response.data.error);
    }
  };

  useEffect(() => {
    if (queryObj.error) {
      setRedirectError(decodeURIComponent(queryObj.error));
    }
  }, [queryObj.error]);

  const showPassword = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <Page title='Login'>
      <MainHeader />
      <CSSTransition
        in={Boolean(redirectError)}
        timeout={600}
        unmountOnExit
        className={classes.errorMsg}
      >
        <div className={classes.errorMsg}>
          <p>{redirectError}</p>
        </div>
      </CSSTransition>
      <main>
        <section className='login d-flex justify-content-center align-items-center'>
          <div className='login__container'>
            <header className='login__header'>
              <h2 className='login__heading'>Login</h2>
            </header>

            <form className='form-login' onSubmit={handleSubmit}>
              <div className='form-group'>
                <label className='form-group__label' htmlFor='email'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  onChange={handleEmail}
                />
              </div>

              {/* ------ Password -------- */}
              <div className='form-group'>
                <label className='form-group__label' htmlFor='password'>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    name='password'
                    id='password'
                    onChange={handlePassword}
                  />
                  <span
                    role='button'
                    className='btn-view-password'
                    onClick={showPassword}
                    tabIndex='0'
                  >
                    {isPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </span>
                </div>
              </div>

              <Button
                variant='contained'
                disabled={isProcessing}
                type='submit'
                className='btn-block'
                size='large'
                style={{ boxShadow: 'none' }}
              >
                {isProcessing ? 'Please wait...' : 'Login'}
              </Button>
            </form>
            <p>
              New here? <Link to='/signup'>Signup</Link>
            </p>
          </div>
        </section>
      </main>
    </Page>
  );
}

const useStyles = makeStyles({
  errorMsg: {
    position: 'fixed',
    top: '8%',
    left: '50%',
    background: 'rgba(240, 68, 68, 90%)',
    zIndex: '99',
    color: '#fff',
    padding: '0.75rem 1rem',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 0 4px rgb(0, 0, 0, 0.25)',
    width: '90%',
    textAlign: 'center',
    maxWidth: '500px',

    '&.enter': {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(1.25)'
    },

    '&.enter-active': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
      transition: 'all 600ms ease-in-out'
    },

    '& p': {
      margin: 0
    }
  }
});

export default withRouter(Login);
