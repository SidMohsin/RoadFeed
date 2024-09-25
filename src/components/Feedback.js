// src/components/Feedback.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Feedback = ({ feedbacks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 2; // Number of feedbacks per page

  // Calculate the indices of the first and last feedbacks on the current page
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

  // Calculate the total number of pages
  const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <PaginationButton
          key={i}
          onClick={() => handlePageChange(i)}
          active={i === currentPage}
        >
          {i}
        </PaginationButton>
      );
    }
    return buttons;
  };

  return (
    <FeedbackContainer>
      <h2>Feedback List</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact No.</th>
            <th>Address</th>
            <th>Status</th>
            <th>Visit</th>
          </tr>
        </thead>
        <tbody>
          {currentFeedbacks.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.name}</td>
              <td>{feedback.contactNo}</td>
              <td>{feedback.address}</td>
              <td>{feedback.status}</td>
              <td>
                <Link
                  to={{
                    pathname: `/feedback/details/${feedback.id}`,  // Link to feedback details page
                    state: { feedback }  // Pass feedback data as state
                  }}
                >
                  <VisitButton>Visit</VisitButton>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination controls */}
      <PaginationContainer>
        {renderPaginationButtons()}
      </PaginationContainer>
    </FeedbackContainer>
  );
};

// Styled Components
const FeedbackContainer = styled.div`
  padding: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const VisitButton = styled.button`
  padding: 8px 16px;
  background-color: #084c61;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #056c8c;
  }
`;

const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const PaginationButton = styled.button`
  padding: 10px;
  margin: 0 5px;
  background-color: ${({ active }) => (active ? '#084c61' : '#ccc')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #056c8c;
    color: #fff;
  }
`;

export default Feedback;
