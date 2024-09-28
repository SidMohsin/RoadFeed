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
    <>
      <nav class="navbar navbar-expand-lg navbar-bg py-3">
        <div class="container">
          <Link class=" navbar-logo navbar-item fs-4" to={'/'}>SafeX</Link>
          <button class="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-link">
                <Link className="navbar-item" to="/">Home</Link>
              </li>
              {
                AdminAuth ?
                  // <Link className="navbar-item" to="/admin/feedback">Feedbacks</Link>
                  <li className="nav-link">

                    <Link className="navbar-item" to="/admin/administration">Administration</Link>
                  </li>
                  :
                  <>
                    <li className="nav-link">

                      <Link className="navbar-item" to="/feedback">Feedback-form</Link>
                    </li>
                  </>
              }
              <li className="nav-link">

                <Link className="navbar-item" to="/contact">Contact</Link>
              </li>
              {AdminAuth ? (
                <li className="nav-link">

                  <button className="navbar-item" onClick={() => { HandleLogout() }}>Logout</button>
                </li>
              ) : (
                <li className="nav-link">

                  <Link className="navbar-item" to="/login">Administrator</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* <div className="navbar-container">
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
      </div> */}
    </>
  );
};

export default Navbar;
