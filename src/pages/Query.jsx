import React, { useState } from 'react';
import { getDB } from '../lib/db';
import './Query.css';

const Query = () => {
  const [sql, setSql] = useState('SELECT * FROM patients;');
  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState('');

const runQuery = async () => {
  console.log("⚙️ Running query:", sql);
  try {
    const db = await getDB();
    const { rows } = await db.query(sql);
    console.log("✅ Parsed rows:", rows);

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

  return (
    <div className="query-page">
      <h2>SQL Query Tool</h2>
      <textarea
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        placeholder="Write your SQL query here"
        rows={5}
      ></textarea>
      <button onClick={runQuery}>Run Query</button>

      {error && <p className="error">{error}</p>}

      {results.length > 0 && (
        <div className="results-table">
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, index) => (
                <tr key={index}>
                  {columns.map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
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
