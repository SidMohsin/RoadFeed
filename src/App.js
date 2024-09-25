// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeedbackSection from './components/FeedbackSection';
import FeedbackForm from './components/FeedbackForm';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import styled from 'styled-components';
import Feedback from './components/Feedback';
import FeedbackDetails from './components/FeedbackDetails'; // Import FeedbackDetails page

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state

  const feedbacks = [
    { id: 1, name: 'John Doe', contactNo: '1234567890', address: '123 Main St', status: 'Pending', email: 'john.doe@example.com', city: 'New York', state: 'NY', latitude: '40.7128', longitude: '-74.0060', description: 'Road issue', image: null },
    { id: 2, name: 'Jane Smith', contactNo: '0987654321', address: '456 Elm St', status: 'Approved', email: 'jane.smith@example.com', city: 'San Francisco', state: 'CA', latitude: '37.7749', longitude: '-122.4194', description: 'Pothole', image: null },
    { id: 3, name: 'Michael Johnson', contactNo: '9876543210', address: '789 Oak St', status: 'Rejected', email: 'michael.j@example.com', city: 'Chicago', state: 'IL', latitude: '41.8781', longitude: '-87.6298', description: 'Cracks', image: null }
  ];

  return (
    <Router>
      <AppContainer>
        <Navbar isAuthenticated={isAuthenticated} />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/feedback" element={<Feedback feedbacks={feedbacks} />} />
            <Route path="/feedback/details/:id" element={<FeedbackDetails feedbacks={feedbacks} />} /> {/* Route for Feedback Details */}
          </Routes>
        </MainContent>
        <FooterContainer>
          <Footer /> 
        </FooterContainer>
      </AppContainer>
    </Router>
  );
}

const Home = () => (
  <>
    <FeedbackSection />
    <ButtonContainer>
      <SubmitFeedbackButton href="/feedback">Submit Feedback</SubmitFeedbackButton>
    </ButtonContainer>
  </>
);

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const SubmitFeedbackButton = styled.a`
  padding: 12px 24px;
  background-color: #084c61;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.1rem;

  &:hover {
    background-color: #056c8c;
  }
`;

const FooterContainer = styled.footer`
  position: relative;
  bottom: 0;
  width: 100%;
`;

export default App;