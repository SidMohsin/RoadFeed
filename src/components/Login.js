// src/components/Login.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Context } from '../Context/StoreContext';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const { setAdminAuth } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add login logic here
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, { Email, Password },{withCredentials: true,}).then((res)=>{
        return res;
      }).catch((e)=>{
        console.log("error in http reqiuest")
      })
      console.log(res)
      if(res.data.code<=210){
        alert('Success');
        setAdminAuth(true); // Update authentication status
        navigate('/admin/feedback'); // Redirect to admin panel
        // Assuming the login is successful
      }else{
        alert(res.data.status);
        setAdminAuth(false); // Update authentication status
        navigate('/login'); // Redirect to admin panel

      }

    } catch (e) {
      console.log("Error is http requets")
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <h2>Login</h2>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Login</SubmitButton>
        <RedirectLink>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </RedirectLink>
      </LoginForm>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.form`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #084c61;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #056c8c;
  }
`;

const RedirectLink = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
`;

export default Login;