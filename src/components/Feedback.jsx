// src/components/Feedback.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../Context/StoreContext';

const Feedback = () => {
  const { feedback,AdminAuth } = useContext(Context);
  const navigate = useNavigate();
  useEffect(()=>{
    if (!AdminAuth) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  })
  const [currentPage, setCurrentPage] = useState(1);
  const feedbackPerPage = 2; // Number of feedback per page
  console.log(feedback)
  // Calculate the indices of the first and last feedback on the current page
  const indexOfLastFeedback = currentPage * feedbackPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage;
  const currentfeedback = feedback.slice(indexOfFirstFeedback, indexOfLastFeedback);

  // Calculate the total number of pages
  const totalPages = Math.ceil(feedback.length / feedbackPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="feedback-container container">
      <h2>Feedback List</h2>
      <div className='feedback-table-container'>
        <table className="feedback-table">
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
            {currentfeedback.map((feedback, index) => (
              <tr key={index}>
                <td>{feedback.Name}</td>
                <td>{feedback.Number}</td>
                <td>{feedback.City}, {feedback.State}</td>
                <td>{feedback.Status}</td>
                <td>
                  <Link
                    to={{
                      pathname: `/feedback/details/${feedback._id}`,  // Link to feedback details page
                      state: { feedback }  // Pass feedback data as state
                    }}
                  >
                    <button className="visit-button">Visit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Pagination controls */}
      <div className="pagination-container">
        {renderPaginationButtons()}
      </div>
    </div>
  );
};

export default Feedback;
