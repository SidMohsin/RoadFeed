// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context/StoreContext';
import axios from 'axios';

const Navbar = () => {
  const { AdminAuth, setAdminAuth } = useContext(Context);
  const HandleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/logout`, {}, { withCredentials: true }).then((res) => {
        setAdminAuth(false);
      }).catch((e) => {

      })
    } catch (e) {
      console.log('Error')
    }
  }
  return (
    <div className="navbar-container">
      <h1 className="navbar-logo">SafeX</h1>
      <div className="navbar-links">
        <Link className="navbar-item" to="/">Home</Link>
        {
          AdminAuth ?
          // <Link className="navbar-item" to="/admin/feedback">Feedbacks</Link>
          <Link className="navbar-item" to="/admin/administration">Administration</Link>
          :
          <>
          <Link className="navbar-item" to="/feedback">Feedback-form</Link>
          </>
        }
        <Link className="navbar-item" to="/contact">Contact</Link>
        {AdminAuth ? (
          <button className="navbar-item" onClick={() => { HandleLogout() }}>Logout</button>
        ) : (
          <Link className="navbar-item" to="/login">Administrator</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
