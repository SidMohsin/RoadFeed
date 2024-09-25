// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <NavBarContainer>
      <Logo>SafeX</Logo>
      <NavLinks>
        <NavItem as={Link} to="/">Home</NavItem>
        <NavItem as={Link} to="/contact">Contact</NavItem>
        <NavItem as={Link} to="/login">Login/Signup</NavItem>
      </NavLinks>
    </NavBarContainer>
  );
};

// Styled components for the Navbar
const NavBarContainer = styled.div`
  background-color: #084c61;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  color: white;
  font-family: 'Roboto', sans-serif;
`;

const NavLinks = styled.div`
  display: flex;
`;

const NavItem = styled.a`
  color: white;
  margin-left: 20px;
  text-decoration: none;
  font-size: 1.1rem;

  &:hover {
    color: #ffcc00;
  }
`;

export default Navbar;