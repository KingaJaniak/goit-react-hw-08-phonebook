import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAsync } from '../redux/authSlice';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { status} = useSelector((state) => state.auth);

  const handleRegister = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (!name || !email || !password) {
      setErrorMessage('❌ Proszę wypełnić wszystkie pola!');
      return;
    }

    const result = await dispatch(registerUserAsync({ name, email, password }));

    if (registerUserAsync.fulfilled.match(result)) {
      setSuccessMessage('✅ Successful registration! 🎉');
    } else if (result.payload?.code === 11000) {
      setErrorMessage('❌ Email already in use! Try logging in.');
    } else {
      setErrorMessage('❌ Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
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
        <button type="submit">Register</button>
      </form>

      {status === 'loading' && <p>🔄 Registering...</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default RegisterPage;
