import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDB } from '../lib/db';
import './PageStyles.css';

const Home = () => {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const db = await getDB();
        const result = await db.query('SELECT COUNT(*) AS total FROM patients');
        setCount(result.rows?.[0]?.total || 0);
      } catch (err) {
        console.error('Failed to load patient count:', err);
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="page">
      <h1>Welcome to the Patient Registry App</h1>
      <p className="description">Choose an action below:</p>
      <div className="button-group">
        <Link to="/register" className="btn">Register Patient</Link>
        <Link to="/query" className="btn secondary">Query Records</Link>
      </div>
      {count !== null && (
        <p className="patient-count">👥 Total Registered Patients: <strong>{count}</strong></p>
      )}
    </div>
  );
};

export default Home;
