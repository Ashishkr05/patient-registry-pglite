import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getDB } from '../lib/db';
import './PatientForm.css';

const PatientForm = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    address: '',
  });

  const [message, setMessage] = useState('');
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    getDB()
      .then(() => {
        console.log('✅ DB loaded inside form');
        setDbLoaded(true);
      })
      .catch((err) => {
        console.error('❌ DB init failed inside form:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');

  if (!dbLoaded) {
    setMessage('⏳ Database is still loading. Please wait a moment...');
    return;
  }

  try {
    const db = await getDB();
    const id = uuidv4();

    await db.exec(`
      INSERT INTO patients (id, name, age, gender, contact, address)
      VALUES ('${id}', '${form.name}', ${Number(form.age)}, '${form.gender}', '${form.contact}', '${form.address}')
    `);

    setMessage('✅ Patient registered successfully!');
    setForm({ name: '', age: '', gender: '', contact: '', address: '' });
  } catch (err) {
    console.error(err);
    setMessage('❌ Failed to register patient');
  }
};

  return (
    <div className="form-container">
      <h2>Register New Patient</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="name" placeholder="Full Name" required value={form.name} onChange={handleChange} />
        <input name="age" type="number" placeholder="Age" required value={form.age} onChange={handleChange} />
        <select name="gender" required value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} />
        <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange}></textarea>
        <button type="submit" disabled={!dbLoaded}>
          {dbLoaded ? 'Register' : 'Loading...'}
        </button>
      </form>
      {message && (
        <p className={`message ${message.includes('❌') ? 'error' : 'success'}`}>{message}</p>
      )}
    </div>
  );
};

export default PatientForm;
