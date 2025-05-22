import React, { useEffect, useState } from 'react';
import { getDB } from '../lib/db';
import './Stats.css';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Stats = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ageGroups = { '0-18': 0, '19-35': 0, '36-60': 0, '60+': 0 };
  const genderCount = { Male: 0, Female: 0, Other: 0 };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = await getDB();
        const { rows } = await db.query('SELECT * FROM patients');

        if (!Array.isArray(rows)) {
          throw new Error("No records returned");
        }

        setData(rows);
      } catch (err) {
        console.error("⚠️ Stats loading error:", err);
        setError("Failed to load statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  data.forEach((p) => {
    const age = p.age;
    if (age <= 18) ageGroups['0-18']++;
    else if (age <= 35) ageGroups['19-35']++;
    else if (age <= 60) ageGroups['36-60']++;
    else ageGroups['60+']++;

    if (genderCount[p.gender] !== undefined) genderCount[p.gender]++;
  });

  const genderChartData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [
      {
        label: 'Gender Distribution',
        data: [genderCount.Male, genderCount.Female, genderCount.Other],
        backgroundColor: ['#8C52FF', '#FF6B6B', '#6BCB77'],
        borderWidth: 1,
      },
    ],
  };

  const ageChartData = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: 'Age Group Distribution',
        data: Object.values(ageGroups),
        backgroundColor: '#8C52FF',
      },
    ],
  };

  if (loading && !error) return <p>Loading s tatistics...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="stats-page">
      <h2>📊 Patient Statistics Dashboard</h2>

      <div className="card-row">
        <div className="stat-card highlight">
          <h3>Total Registered Patients</h3>
          <p className="big-count">{data.length}</p>
        </div>
      </div>

      <div className="card-row">
        <div className="stat-card">
          <h3>Gender Distribution</h3>
          <Pie data={genderChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>

        <div className="stat-card">
          <h3>Age Group Distribution</h3>
          <Bar data={ageChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
