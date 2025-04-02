import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authSlice'; 

const Navigation = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logoutUser());  
    navigate('/'); 
  };

  return (
    <nav>
      {}
      <NavLink onClick={handleHomeClick} style={{ padding: '10px', marginRight: '20px' }}>
        Home
      </NavLink>

      {}
      {isAuthenticated ? (
        <>
          <NavLink to="/contacts" style={{ padding: '10px', marginRight: '20px' }}>
            Contacts
          </NavLink>
          <button onClick={handleLogout} style={{ padding: '10px', marginRight: '20px' }}>
            Logout
          </button>
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
