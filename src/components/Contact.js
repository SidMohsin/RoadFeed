// src/components/Contact.js
import React from 'react';
import styled from 'styled-components';

const Contact = () => {
  return (
    <Container>
      <h2>Contact Us</h2>
      <p>Please reach out with any questions or feedback.</p>
    </Container>
  );
};

// Styled components
const Container = styled.div`
  padding: 40px;
  text-align: center;
`;

export default Contact;