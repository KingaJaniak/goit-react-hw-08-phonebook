import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUserAsync } from '../redux/authSlice';  // Zmieniony import

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    dispatch(registerUserAsync({ email, password }));  // Wywołanie registerUserAsync
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
