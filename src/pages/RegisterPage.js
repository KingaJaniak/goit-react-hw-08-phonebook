import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import { registerUserAsync } from '../redux/authSlice';
import { useAuth } from '../hooks/useAuth'; 


const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login } = useAuth();  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status, error } = useSelector((state) => state.auth);  

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill in all fields!');
      return;
    }

    const result = await dispatch(registerUserAsync({ name, email, password }));

    if (registerUserAsync.fulfilled.match(result)) {
      alert('Registration successful!');
      login({ email, password });  
      navigate('/contacts'); 
    } else {
      if (result?.payload?.code === 11000) {
        alert('This email is already in use. Please use a different one.');
      } else {
        alert('Registration failed. Try again.');
      }
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
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name" className="input-field"
        />
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
        <button type="submit" className="submit-button">Register</button>
      </form>

      {status === 'loading' && <p>🔄 Registering...</p>}
      {renderErrorMessage() && <p style={{ color: 'red' }}>{renderErrorMessage()}</p>}
    </div>
  );
};

export default RegisterPage;
