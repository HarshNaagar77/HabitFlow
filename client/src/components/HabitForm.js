import React, { useState } from 'react';
import '../css/components.css';

export default function HabitForm({ onSubmit, initial = {}, onCancel }) {
  const [form, setForm] = useState({
    name: initial.name || '',
    frequency: initial.frequency || 'daily',
    categories: Array.isArray(initial.categories) ? initial.categories.join(', ') : (initial.categories || initial.category || '')
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Name is required');
      return;
    }
    setError('');
    // Convert comma-separated categories to array
    const categoriesArr = form.categories
      ? form.categories.split(',').map(t => t.trim()).filter(Boolean)
      : [];
    onSubmit({ ...form, categories: categoriesArr });
  };

  return (
    <form onSubmit={handleSubmit} className="card habit-form">
      <h3>{initial._id ? 'Edit Habit' : 'Add Habit'}</h3>

      <div className="habit-flex">
        <div className="habit-form-group">
        <label className="habit-form-label">Name</label>
        <input name="name" value={form.name} onChange={handleChange} required className="input" />
      </div>
      <div className="habit-form-group">
        <label className="habit-form-label">Frequency</label>
        <select name="frequency" value={form.frequency} onChange={handleChange} className="input">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <div className="habit-form-group">
        <label className="habit-form-label">Categories/Tags
          <span className="habit-form-tags-hint">(comma separated)</span>
        </label>
        <input name="categories" value={form.categories} onChange={handleChange} className="input" placeholder="e.g. Health, Fitness, Study" />
      </div>
      </div>
      {error && <div className="habit-form-error">{error}</div>}
      <button className="button" type="submit">{initial._id ? 'Update' : 'Add'}</button>
      {onCancel && <button type="button" className="button habit-form-cancel" onClick={onCancel}>Cancel</button>}
    </form>
  );
}
