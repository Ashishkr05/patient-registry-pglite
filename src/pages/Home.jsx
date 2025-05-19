// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const Home = () => (
  <div className="page">
    <h1>Welcome to the Patient Registry App</h1>
    <p className="description">Choose an action below:</p>
    <div className="button-group">
      <Link to="/register" className="btn">Register Patient</Link>
      <Link to="/query" className="btn secondary">Query Records</Link>
    </div>
  </div>
);

export default Home;
