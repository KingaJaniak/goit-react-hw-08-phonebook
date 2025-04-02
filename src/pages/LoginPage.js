import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUserAsync({ email, password }));
  
    if (loginUserAsync.fulfilled.match(result)) {
      navigate('/contacts');
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>

      {status === 'loading' && <p>🔄 Logging in...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
    </div>
  );
};

export default LoginPage;
