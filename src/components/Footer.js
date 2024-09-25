// src/components/Footer.js
import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2024 SafeX. All rights reserved.</p>
    </FooterContainer>
  );
};

// Styled components for Footer
const FooterContainer = styled.footer`
  background-color: #084c61;
  color: white;
  text-align: center;
  padding: 20px;
  position: relative;
  width: 100%;
  bottom: 0;
`;

export default Footer;