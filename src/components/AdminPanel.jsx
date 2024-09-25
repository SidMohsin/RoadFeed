// src/components/AdminPanel.js
import React from 'react';

const AdminPanel = () => {
  const feedbackList = [
    { id: 1, feedback: "Roads need repair in area X.", status: "Pending" },
    { id: 2, feedback: "Street lights are not working.", status: "Approved" },
    // Add more feedback as necessary
  ];

  return (
    <div className="admin-panel-container">
      <h2>Admin Panel</h2>
      <div className="feedback-list">
        {feedbackList.map((item) => (
          <div className="feedback-item" key={item.id}>
            <p className="feedback-text">{item.feedback}</p>
            <span className={`feedback-status ${item.status.toLowerCase()}`}>
              {item.status}
            </span>
            <button className="action-button">Approve</button>
            <button className="action-button">Reject</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
