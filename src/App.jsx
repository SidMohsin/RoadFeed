// src/App.js
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeedbackSection from './components/FeedbackSection';
import FeedbackForm from './components/FeedbackForm';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import Feedback from './components/Feedback';
import FeedbackDetails from './components/FeedbackDetails';
import './App.css'; // Import CSS file
import { Context } from './Context/StoreContext';
import Loading from './components/Loading/Loading'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { GetCurrentLocation, Load, setLoad, fetchFeedback, AdminAuth } = useContext(Context)
  useEffect(() => {
    // Fetch location when the component mounts
    const fetchLocation = async () => {
      setLoad(true); // Set loading to true before fetching
      const locationFetched = await GetCurrentLocation();
      setLoad(!locationFetched); // Set loading to false based on whether location was fetched successfully
    };

    fetchLocation();
  }, []);
  useEffect(() => {
    const fetchDetails = async () => {
      await fetchFeedback()
    }
    fetchDetails();
  }, [isAuthenticated])
  if (Load) {
    document.body.classList.add('scroll-none');

    return <Loading />
  }

  return (
    <Router>

      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticated} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/admin/feedback" element={<Feedback />} />
            <Route path="/feedback/details/:id" element={<FeedbackDetails />} />
          </Routes>
        </main>
        <footer className="footer-container">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

const Home = () => (
  <>
    <FeedbackSection />
    <div className="button-container">
      <Link className="submit-feedback-button" to="/feedback">Submit Feedback</Link>
    </div>
  </>
);

export default App;
