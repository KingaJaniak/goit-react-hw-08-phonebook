import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserAsync } from '../redux/authSlice';  



const Navigation = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserAsync());  
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav>
      <NavLink onClick={handleHomeClick} className="nav-button">
        Home
      </NavLink>

      {isAuthenticated ? (
        <>
          <NavLink to="/contacts" className="nav-button">
            Contacts
          </NavLink>
          <button onClick={handleLogout} className="nav-button">
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/register" className="nav-button">
            Register
          </NavLink>
          <NavLink to="/login" className="nav-button">
            Login
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;
