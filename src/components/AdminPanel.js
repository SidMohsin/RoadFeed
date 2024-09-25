// src/components/AdminPanel.js
import React from 'react';
import styled from 'styled-components';

const AdminPanel = () => {
  const feedbackList = [
    { id: 1, feedback: "Roads need repair in area X.", status: "Pending" },
    { id: 2, feedback: "Street lights are not working.", status: "Approved" },
    // Add more feedback as necessary
  ];

  return (
    <AdminPanelContainer>
      <h2>Admin Panel</h2>
      <FeedbackList>
        {feedbackList.map((item) => (
          <FeedbackItem key={item.id}>
            <FeedbackText>{item.feedback}</FeedbackText>
            <FeedbackStatus status={item.status}>{item.status}</FeedbackStatus>
            <ActionButton>Approve</ActionButton>
            <ActionButton>Reject</ActionButton>
          </FeedbackItem>
        ))}
      </FeedbackList>
    </AdminPanelContainer>
  );
};

const AdminPanelContainer = styled.div`
  padding: 2rem;
`;

const FeedbackList = styled.div`
  margin-top: 1rem;
`;

const FeedbackItem = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FeedbackText = styled.p`
  margin: 0;
`;

const FeedbackStatus = styled.span`
  padding: 0.5rem;
  border-radius: 3px;
  background-color: ${(props) => (props.status === "Approved" ? "#d4edda" : "#fff3cd")};
  color: ${(props) => (props.status === "Approved" ? "#155724" : "#856404")};
`;

const ActionButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: #084c61;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #056c8c;
  }
`;

export default AdminPanel;