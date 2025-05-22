// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-brand">Patient Registry</div>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/register" className={location.pathname === '/register' ? 'active' : ''}>Register</Link>
        <Link to="/query" className={location.pathname === '/query' ? 'active' : ''}>Query</Link>
        <Link to="/stats" className={location.pathname === '/stats' ? 'active' : ''}>View Statistics</Link>
      </div>
    </nav>
  );
};

export default Navbar;
