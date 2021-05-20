import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function PageNotFound() {
  return (
    <div
      style={{ minHeight: '100vh' }}
      className='text-center d-flex justify-content-center align-items-center'
    >
      <div>
        <img
          style={{ width: '80%' }}
          src='/images/page-not-found.svg'
          alt='page not found'
        />
        <h2 style={{ margin: '1rem 0' }}>Sorry, Page Not Found :(</h2>
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
    </div>
  );
}

export default PageNotFound;
