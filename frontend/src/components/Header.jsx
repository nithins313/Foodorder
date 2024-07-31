// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/order">Order</Link></li>
          <li><Link to="/review">Review</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
