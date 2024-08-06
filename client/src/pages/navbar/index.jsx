import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector } from "react-redux";
import { InputBase, Menu, MenuItem } from '@mui/material';
import { Search, Notifications, Message, AccountCircle } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const goToHome = () => {
    navigate('/');
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/');
  };
  const fullName = `${user.firstName} ${user.lastName}`;


  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 
          className="text-2xl font-bold cursor-pointer" 
          onClick={goToHome}
        >
          SocialMediaApp
        </h1>
        <div className="relative">
          <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
          <InputBase
            placeholder="Search…"
            classes={{
              root: 'pl-10 pr-4 py-2 rounded-md border border-gray-300 w-64',
            }}
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Notifications className="cursor-pointer" />
        <Message className="cursor-pointer" />
        <div>
          <AccountCircle 
            className="cursor-pointer" 
            onClick={handleProfileMenuOpen}
          />
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}>{fullName}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
