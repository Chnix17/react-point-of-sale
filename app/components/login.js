'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from './Header'; // Ensure you import the Header component
 // Ensure you import the Receipt component
import '../style.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedInName, setLoggedInName] = useState(sessionStorage.getItem('username') || '');
  const [showReceipt, setShowReceipt] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost/coc/api/hello.php', {
        params: {
          username,
          password,
        },
      });
      console.log(response.data);

      if (response.data.success) {
        sessionStorage.setItem('username', response.data.name);
        setLoggedInName(response.data.name);
        router.push('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Error connecting to server');
    }
  };

  return (
    <>
      
      
      <div className="formWrapper">
        <div className="form">
          <div className="avatar"></div>
          <h1>LOGIN</h1>

          <form onSubmit={handleLogin}>
            <div className="container">
              <input
                required
                type="text"
                name="username"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="label">Username</label>
            </div>
            <div className="container">
              <input
                required
                type="password"
                name="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">Password</label>
            </div>
            <button type="submit" className="button">
              <span>Login</span>
            </button>
          </form>
          {error && (
            <div className="error">
              <div className="error__icon">
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path>
                </svg>
              </div>
              <div className="error__title">{error}</div>
              <div className="error__close" onClick={() => setError('')}>
                <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#393a37"></path>
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
