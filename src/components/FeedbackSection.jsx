import React from 'react';
import { Link } from 'react-router-dom';

const FeedbackSection = () => {
  return (
    <>
      <div className="section-container">
        <h2 className="title">We Care About Your Safety</h2>
        <p className="description">
          Your feedback is crucial for improving road conditions.
          By sharing your experiences, you help us understand the areas that need attention.
          Together, we can ensure safer roads for everyone.
        </p>
        <div className="button-container">
          <Link className="submit-feedback-button" to="/feedback">Submit Feedback</Link>
          <Link className="submit-feedback-button" to="/searchReport">View Report</Link>
        </div>
      </div>

    </>
  );
};

export default FeedbackSection;
