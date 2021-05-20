import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

import AppContext from '../AppContext';

function User() {
  const { appState, appDispatch } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    if (window.confirm('Do you want to logout?')) {
      setAnchorEl(null);
      appDispatch({ type: 'logout' });
    }
  };

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    if (appState.isLoggedIn) {
      setAnchorEl(null);
    }
  };

  return (
    <>
      {appState.isLoggedIn ? (
        <>
          <StyledButton
            variant='contained'
            size='large'
            aria-controls='customized-menu'
            aria-haspopup='true'
            onClick={handleMenuOpen}
            startIcon={<PermIdentityIcon className='svg-icon' />}
          >
            {appState.user.firstName.toUpperCase()}
          </StyledButton>
          <StyledMenu
            id='customized-menu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            keepMounted
          >
            <StyledMenuItem component={Link} to='/profile'>
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary='Profile' />
            </StyledMenuItem>

            <StyledMenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </StyledMenuItem>
          </StyledMenu>
        </>
      ) : (
        <StyledButton
          variant='contained'
          color='primary'
          size='large'
          to='/login'
          component={Link}
        >
          Login
        </StyledButton>
      )}
    </>
  );
}

const StyledMenu = withStyles({})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles({
  root: {
    '&:focus, &:focus-within': {
      backgroundColor: 'var(--clr-primary)',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#fff'
      }
    }
  }
})(MenuItem);

const StyledButton = withStyles({
  root: {
    backgroundColor: 'var(--clr-primary)',
    color: '#fff',
    marginLeft: '2rem',

    '&:focus, &:hover': {
      backgroundColor: 'var(--clr-primary)'
    }
  }
})(Button);

export default User;
