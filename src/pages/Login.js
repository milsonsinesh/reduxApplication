import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from  '../features/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (
      (email === 'admin@gmail.com' && password === 'admin') ||
      foundUser
    ) {
      dispatch(login(email));
      navigate('/userManagement'); // Navigate to user management page
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to Astronaut VR</h2>
        <form onSubmit={handleSubmit}>
          <label>Log in</label>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
