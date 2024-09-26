// src/App.js
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeedbackSection from './components/FeedbackSection';
import FeedbackForm from './components/FeedbackForm';
import AdminPanel from './components/AdminPanel';
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
  const { GetCurrentLocation, Load, setLoad,fetchFeedback } = useContext(Context)
  useEffect(() => {
    // Fetch location when the component mounts
    const fetchLocation = async () => {
      setLoad(true); // Set loading to true before fetching
      const locationFetched = await GetCurrentLocation();
      setLoad(!locationFetched); // Set loading to false based on whether location was fetched successfully
    };

    fetchLocation();
  }, []);
  useEffect(()=>{
    const fetchDetails = async()=>{
      await fetchFeedback()
    }
    fetchDetails();
  },[isAuthenticated])
  if (Load) {
    document.body.classList.add('scroll-none');

    return <Loading />
  }

  const feedbacks = [
    { id: 1, name: 'John Doe', contactNo: '1234567890', address: '123 Main St', status: 'Pending', email: 'john.doe@example.com', city: 'New York', state: 'NY', latitude: '40.7128', longitude: '-74.0060', description: 'Road issue', image: null },
    { id: 2, name: 'Jane Smith', contactNo: '0987654321', address: '456 Elm St', status: 'Approved', email: 'jane.smith@example.com', city: 'San Francisco', state: 'CA', latitude: '37.7749', longitude: '-122.4194', description: 'Pothole', image: null },
    { id: 3, name: 'Michael Johnson', contactNo: '9876543210', address: '789 Oak St', status: 'Rejected', email: 'michael.j@example.com', city: 'Chicago', state: 'IL', latitude: '41.8781', longitude: '-87.6298', description: 'Cracks', image: null }
  ];

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
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/feedback" element={<Feedback feedbacks={feedbacks} />} />
            <Route path="/feedback/details/:id" element={<FeedbackDetails feedbacks={feedbacks} />} />
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
