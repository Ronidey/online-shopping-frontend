import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function ProfileMenu({ handleLogout, handleDeleteAccount }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label='more'
        aria-controls='profile-menu'
        aria-haspopup='true'
        onClick={handleClick}
        color='inherit'
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='profile-menu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>

        <MenuItem onClick={handleDeleteAccount}>Delete Account</MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileMenu;
