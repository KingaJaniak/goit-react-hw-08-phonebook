import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const HomePage = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

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
