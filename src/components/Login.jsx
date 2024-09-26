// src/components/Login.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../Context/StoreContext';
import axios from 'axios';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const { setAdminAuth, AdminAuth } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (AdminAuth) {
      navigate('/admin/feedback');
    }
  }, [AdminAuth]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, { Email, Password }, { withCredentials: true })
        .then((res) => res)
        .catch((e) => {
          console.log("Error in HTTP request");
        });

      if (res?.data?.code <= 210) {
        alert('Success');
        setAdminAuth(true);
        navigate('/admin/feedback');
      } else {
        alert(res?.data?.status);
        setAdminAuth(false);
        navigate('/login');
      }
    } catch (e) {
      console.log("Error in HTTP request");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit-button" type="submit">Login</button>
        <div className="redirect-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
