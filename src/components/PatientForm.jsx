import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
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

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [dbLoaded, setDbLoaded] = useState(false);

  useEffect(() => {
    getDB()
      .then(() => {
        setDbLoaded(true);
      })
      .catch((err) => {
        console.error('❌ DB init failed inside form:', err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow digits in contact field
    if (name === 'contact') {
      const isValid = /^\+?\d*$/.test(value);
      if (!isValid) return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Validation logic
  const validate = () => {
    const newErrors = {};

    if (!form.contact || form.contact.replace(/\D/g, '').length < 10) {
    newErrors.contact = 'Contact must be at least 10 digits.';
    }
    if (!form.address || form.address.trim() === '') {
      newErrors.address = 'Address is required.';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!dbLoaded) {
      setMessage('⏳ Database is still loading. Please wait a moment...');
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear errors

    try {
      const db = await getDB();
      const id = uuidv4();

      await db.exec(`
      INSERT INTO patients (id, name, age, gender, contact, address)
      VALUES ('${id}', '${form.name}', ${Number(form.age)}, '${form.gender}', '${form.contact}', '${form.address}')
      `);

      setMessage('✅ Patient registered successfully!');
      setForm({ name: '', age: '', gender: '', contact: '', address: '' });
      localStorage.setItem('patient-update', Date.now().toString());
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to register patient');
    }
  };

  return (
    <div className="form-container">
      <Link to="/" className="back-link">← Back to Home</Link>
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

        <input
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          required
        />
        {errors.contact && <p className="error-text">{errors.contact}</p>}

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        ></textarea>
        {errors.address && <p className="error-text">{errors.address}</p>}
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
