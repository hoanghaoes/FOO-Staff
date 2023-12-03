import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const validateInputs = () => {
    if (credentials.email === '' || credentials.password === '') {
      setValidationError('Fill to continue');
    } else {
      setValidationError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateInputs();

    if (validationError) {
      return;
    }

    const loginUser = async (email, password) => {
      try {
        const response = await axios.post('https://quiz-backend-nine.vercel.app/user/login', credentials,{
          email,
          password,
        });

        if (response.status === 200) {
          navigate('/home');
          console.log(response.data);
          setAuthenticationState(true, response.data.access_token);
        } else if (response.status === 401) {
          alert('Incorrect password');
        }
      } catch (err) {
        setError(err.response.data.error);
      }
    };

    const setAuthenticationState = (isAuthenticated, token) => {
      sessionStorage.setItem("isAuthenticated", isAuthenticated);
      sessionStorage.setItem("token", token);
    };

    loginUser();
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      {validationError && <p>{validationError}</p>}
    </div>
  );
};

export default LoginForm;