import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getDB } from '../lib/db';
import './Query.css';

const Query = () => {
  const [sql, setSql] = useState('SELECT * FROM patients;');
  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState('');
  const [searchName, setSearchName] = useState('');

  const runQuery = async () => {
    try {
      const db = await getDB();
      const queryText = searchName
        ? `SELECT * FROM patients WHERE name ILIKE '%${searchName}%'`
        : sql;
      const { rows } = await db.query(queryText);

      if (rows.length > 0) {
        setColumns(Object.keys(rows[0]));
        setResults(rows);
      } else {
        setColumns([]);
        setResults([]);
      }
      setError('');
    } catch (err) {
      console.error('❌ Query failed:', err);
      setResults([]);
      setColumns([]);
      setError(err.message || 'Invalid SQL');
    }
  };

  const handleDelete = async (id) => {
    try {
      const db = await getDB();
      await db.query(`DELETE FROM patients WHERE id = $1`, [id]);
      runQuery(); // Refresh data
    } catch (err) {
      console.error('❌ Delete failed:', err);
      setError('Failed to delete patient.');
    }
  };

  const exportToCSV = () => {
    const csvRows = [];

    // Headers
    csvRows.push([...columns, 'Action'].join(','));

    // Data rows
    results.forEach(row => {
      const rowData = columns.map(col => `"${row[col]}"`);
      rowData.push(''); // Placeholder for Action column
      csvRows.push(rowData.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'patient_records.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="query-page">
      <Link to="/" className="back-link">← Back to Home</Link>
      <h2>SQL Query Tool</h2>

      <input
        type="text"
        placeholder="Search by Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
      />

      <textarea
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        placeholder="Write your SQL query here"
        rows={5}
      ></textarea>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button onClick={runQuery}>Run Query</button>
        {results.length > 0 && (
          <button onClick={exportToCSV} className="btn secondary">
            Export to CSV
          </button>
        )}
      </div>

      {error && <p className="error">{error}</p>}

      {results.length > 0 && (
        <div className="results-table">
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(row.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Query;
