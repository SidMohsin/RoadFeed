// src/components/FeedbackSection.js
import React from 'react';
import styled from 'styled-components';

const FeedbackSection = () => {
  return (
    <SectionContainer>
      <Title>We Care About Your Safety</Title>
      <Description>
        Your feedback is crucial for improving road conditions. 
        By sharing your experiences, you help us understand the areas that need attention. 
        Together, we can ensure safer roads for everyone.
      </Description>
    </SectionContainer>
  );
};

// Styled components for Feedback Section
const SectionContainer = styled.div`
  background-color: #f3f4f4;
  padding: 40px;
  text-align: center;
  margin: 20px 0;
`;

const Title = styled.h2`
  color: #084c61;
`;

const Description = styled.p`
  color: #333;
  max-width: 600px;
  margin: 0 auto;
`;

export default FeedbackSection;