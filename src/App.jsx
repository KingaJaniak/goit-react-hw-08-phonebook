import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import './index.css';

function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/contacts');
    }
  }, [user, navigate]);

  return (
    <div>
      <div>
        {}
        {!user ? (
          <>
            <button onlick={() => navigate('/')} className="nav-button">
              Home
            </button>
            <button
              onClick={() => navigate('/register')}
              className="nav-button"
            >
              Register
            </button>
            <button onClick={() => navigate('/login')} className="nav-button">
              Login
            </button>
            <HomePage/>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/contacts')}
              className="nav-button"
            >
              Contacts
            </button>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </>
        )}
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/contacts"
          element={user ? <ContactsPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
