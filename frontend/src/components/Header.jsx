// src/components/Header.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoImage from '../assets/foodorder.png';

const Header = () => {
  return (
    <Nav>
      <Logo src = {logoImage} alt = "Foodorder Logo"/>
      <NavMenu>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/menu">Menu</NavItem>
        <NavItem to="/contact">Contact</NavItem>
      </NavMenu>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
`;

const Logo = styled.img`
  height: 50px; 
`;

const NavMenu = styled.div`
  display: flex;
  gap: 20px;
`;

const NavItem = styled(Link)`
  text-decoration: none;
  font-size: 1em;
  cursor: pointer;
  color: inherit;
  &:hover {
    opacity: 0.7;
  }
`;

export default Header;
