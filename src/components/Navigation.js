import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';

const Navigation = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <nav>
      <NavLink to="/" style={{ padding: '10px', marginRight: '20px' }}>
        Home
      </NavLink>

      {isAuthenticated ? (
        <>
          <NavLink to="/contacts" style={{ padding: '10px', marginRight: '20px' }}>
            Contacts
          </NavLink>
          <UserMenu />
        </>
      ) : (
        <>
          <NavLink to="/register" style={{ padding: '10px', marginRight: '20px' }}>
            Register
          </NavLink>
          <NavLink to="/login" style={{ padding: '10px', marginRight: '20px' }}>
            Login
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;
