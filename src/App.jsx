import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';  
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

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
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/register")}>Register</button>
            <button onClick={() => navigate("/login")}>Login</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/contacts")}>Contacts</button>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/contacts" element={user ? <ContactsPage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
