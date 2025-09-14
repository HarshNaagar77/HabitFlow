
import React, { useState } from 'react';
import '../css/components.css';
import API from '../api';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
  const res = await API.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
    }
  };

  return (
<div className="container">
  <div className="card auth-card">
        <h2 className ="login">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label>Email</label><br/>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="input" />
          </div>
          <div className="auth-form-group">
            <label>Password</label><br/>
            <input name="password" type="password" value={form.password} onChange={handleChange} required className="input" />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button className="button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
