import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';

const Navigation = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {isAuthenticated ? (
        <>
          <NavLink to="/contacts">Contacts</NavLink>
          <UserMenu />
        </>
      ) : (
        <>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;
