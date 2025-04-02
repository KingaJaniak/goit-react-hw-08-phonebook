import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status, error } = useAuth();  

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields!');
      return;
    }

    const result = await login({ email, password });
    if (result) {
      navigate('/contacts');
    } else {
      alert('Login failed. Try again.');
    }
  };

  const renderErrorMessage = () => {
    if (error) {
      if (typeof error === 'object') {
        return error.message || JSON.stringify(error);
      }
      return error;
    }
    return null;
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" className="input-field"
        />
        <button type="submit" className="submit-button">Login</button>
      </form>

      {status === 'loading' && <p>🔄 Logging in...</p>}
      {renderErrorMessage() && <p style={{ color: 'red' }}>{renderErrorMessage()}</p>}
    </div>
  );
};

export default LoginPage;
