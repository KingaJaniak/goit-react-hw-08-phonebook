import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice';

const UserMenu = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser()); 
  };

  return (
    <div>
      <p>User Email</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;