
import React, { useState } from 'react';
import '../css/components.css';
import axios from 'axios';

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/auth/register', form);
      onRegister();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    }
  };

  return (
    <div className="container">
  <div className="card auth-card">
        <h2 className="login">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label>Username</label><br/>
            <input name="username" value={form.username} onChange={handleChange} required className="input" />
          </div>
          <div className="auth-form-group">
            <label>Email</label><br/>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="input" />
          </div>
          <div className="auth-form-group">
            <label>Password</label><br/>
            <input name="password" type="password" value={form.password} onChange={handleChange} required className="input" />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button className="button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
