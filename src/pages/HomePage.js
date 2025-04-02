import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';  

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/contacts" />;
  }

  return (
    <div>
      <h1>Welcome to Phonebook</h1>
      <p>Your contacts, always with you.</p>
      <p>Please log in or register to manage your contacts.</p>
    </div>
  );
};

export default HomePage;
