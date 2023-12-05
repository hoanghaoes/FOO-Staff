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
        const response = await axios.post('http://127.0.0.1:8081/api/v1/user/login', credentials,{
          email,
          password,
        });

        if (response.status === 200) {
          navigate('/home');
          console.log(response.data);
          const accessToken = response.data.accessKey;
          localStorage.setItem('accessToken', accessToken);
          setAuthenticationState(true, response.data.access_token);
        } else if (response.status === 404) {
          alert('Incorrect password');
        }
      } catch (err) {
        setError(err.response.data.error);
      }
    };

    const setAuthenticationState = (isAuthenticated, token) => {
      sessionStorage.setItem("isAuthenticated", isAuthenticated);
      sessionStorage.setItem("accessKey", token);
    };

    loginUser();
 };

 return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {validationError && <p className="error-message">{validationError}</p>}
    </div>
 );
};

export default LoginForm;