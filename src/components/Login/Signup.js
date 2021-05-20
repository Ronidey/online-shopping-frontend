import React, { Component } from 'react';
import Page from '../Page';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { validateEmail } from '../../helper';
import Button from '@material-ui/core/Button';

import AppContext from '../../AppContext';
import MainHeader from '../MainHeader';
import './Form.css';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formFields: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },

      formErrors: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },

      isPasswordVisible: false,
      signingIn: false
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showPassword = this.showPassword.bind(this);
  }

  checkFieldValidity(fieldName, value) {
    let error = '';

    switch (fieldName) {
      case 'firstName':
        error =
          value.length < 3 || value.length > 8
            ? 'First name must be between 3 to 8 letters!'
            : '';
        break;

      case 'lastName':
        error =
          value.length < 3 || value.length > 8
            ? 'Last name must be between 3 to 8 letters!'
            : '';
        break;

      case 'email':
        error = validateEmail(value) ? '' : 'Invalid email address!';
        break;

      case 'password':
        error =
          value.length < 8 || value.length > 30
            ? 'Password must be 8 to 30 characters long!'
            : '';
        break;

      default:
        throw new Error('Something went wrong!');
    }

    return error;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { appDispatch } = this.context;

    const formErrors = { ...this.state.formErrors };
    let valid = true;

    Object.keys(this.state.formFields).forEach((prop) => {
      const fieldError = this.checkFieldValidity(
        prop,
        this.state.formFields[prop]
      );
      if (fieldError) {
        valid = false;
        formErrors[prop] = fieldError;
      }
    });

    this.setState({ formErrors });
    if (!valid) return;

    this.setState({ signingIn: true });

    axios
      .post('/users/signup', this.state.formFields)
      .then((res) => {
        this.props.history.push('/');
        appDispatch({ type: 'login', payload: res.data.user });
      })
      .catch((err) => {
        this.setState({ signingIn: false });
        alert(err.response.data.error);
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    const formErrors = { ...this.state.formErrors };
    const formFields = { ...this.state.formFields };

    formErrors[name] = ''; // resetting error field
    formFields[name] = value;

    this.setState({ formFields, formErrors });
  }

  handleBlur(e) {
    const { name, value } = e.target;
    const formErrors = { ...this.state.formErrors };

    formErrors[name] = this.checkFieldValidity(name, value);

    this.setState({ formErrors });
  }

  showPassword() {
    this.setState((state) => ({ isPasswordVisible: !state.isPasswordVisible }));
  }

  render() {
    const {
      firstName: firstNameErr,
      lastName: lastNameErr,
      email: emailErr,
      password: passwordErr
    } = this.state.formErrors;

    return (
      <Page title='Signup'>
        <MainHeader />
        <main>
          <section className='join-us d-flex justify-content-center align-items-center'>
            <div className='join-us__container'>
              <header className='join-us__header'>
                <h2 className='join-us__heading'>Join Us</h2>
              </header>

              <form className='form-signup' onSubmit={this.handleSubmit}>
                <div className='form-row'>
                  <div className='form-col'>
                    {/* ------ First Name -------- */}
                    <div className='form-group'>
                      <label className='form-group__label' htmlFor='firstName'>
                        First Name
                      </label>
                      <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        className={firstNameErr ? 'is-invalid' : ''}
                      />
                      {firstNameErr && (
                        <span className='form-error'>{firstNameErr}</span>
                      )}
                    </div>
                  </div>

                  <div className='form-col'>
                    {/* ------ Last Name -------- */}
                    <div className='form-group'>
                      <label className='form-group__label' htmlFor='lastName'>
                        Last Name
                      </label>
                      <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        className={lastNameErr ? 'is-invalid' : ''}
                      />
                      {lastNameErr && (
                        <span className='form-error'>{lastNameErr}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ------ Email -------- */}
                <div className='form-group'>
                  <label className='form-group__label' htmlFor='email'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    className={emailErr ? 'is-invalid' : ''}
                  />
                  {emailErr && <span className='form-error'>{emailErr}</span>}
                </div>

                {/* ------ Password -------- */}
                <div className='form-group'>
                  <label className='form-group__label' htmlFor='password'>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={this.state.isPasswordVisible ? 'text' : 'password'}
                      name='password'
                      id='password'
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      className={passwordErr ? 'is-invalid' : ''}
                    />
                    <span
                      role='button'
                      tabIndex='0'
                      className='btn-view-password'
                      onClick={this.showPassword}
                    >
                      {this.state.isPasswordVisible ? (
                        <AiFillEye />
                      ) : (
                        <AiFillEyeInvisible />
                      )}
                    </span>
                  </div>
                  {passwordErr && (
                    <span className='form-error'>{passwordErr}</span>
                  )}
                </div>

                <Button
                  variant='contained'
                  disabled={this.state.signingIn}
                  type='submit'
                  size='large'
                  style={{ boxShadow: 'none' }}
                >
                  {this.state.signingIn ? 'Please wait...' : 'Signup'}
                </Button>
              </form>
              <p>
                You already have an account? <Link to='/login'>Login</Link>
              </p>
            </div>
          </section>
        </main>
      </Page>
    );
  }
}

Signup.contextType = AppContext;

export default withRouter(Signup);
