// src/components/FeedbackDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const FeedbackDetails = ({ feedbacks }) => {
  const { id } = useParams(); // Get the ID from the URL
  const feedback = feedbacks.find(fb => fb.id === parseInt(id)); // Find the feedback by ID

  if (!feedback) {
    return <h2>Feedback not found</h2>;
  }

  return (
    <DetailsContainer>
      <h2>Feedback Details</h2>
      <InfoContainer>
        <DetailsLeft>
          <p className="detail-item"><strong>Name:</strong> {feedback.name}</p>
          <p className="detail-item"><strong>Email:</strong> {feedback.email}</p>
          <p className="detail-item"><strong>Contact No.:</strong> {feedback.contactNo}</p>
          <p className="detail-item"><strong>City:</strong> {feedback.city}</p>
          <p className="detail-item"><strong>State:</strong> {feedback.state}</p>
          <p className="detail-item"><strong>Latitude:</strong> {feedback.latitude}</p>
          <p className="detail-item"><strong>Longitude:</strong> {feedback.longitude}</p>
        </DetailsLeft>
        <DetailsRight>
          <img className="image" src={feedback.image || 'https://via.placeholder.com/150'} alt="Feedback" />
          <p className="description"><strong>Description:</strong> {feedback.description}</p>
        </DetailsRight>
      </InfoContainer>
      <VisitButton href="#">Visit</VisitButton>
    </DetailsContainer>
  );
};

// Styled Components
const DetailsContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    color: #084c61;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 20px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
`;

const DetailsLeft = styled.div`
  flex: 1;
  margin-right: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DetailsRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 20px;
    border: 2px solid #084c61;
  }

  p {
    margin-top: 10px;
  }
`;

const VisitButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #084c61;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #056c8c;
  }
`;

export default FeedbackDetails;