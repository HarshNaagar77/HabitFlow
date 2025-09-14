

import React, { useEffect, useState } from 'react';
import '../css/components.css';
import HabitForm from '../components/HabitForm';
import API from '../api';

// Helper to get days in current month
function getDaysInMonth(year, month) {
  return new Array(new Date(year, month + 1, 0).getDate()).fill(0).map((_, i) => i + 1);
}

// Helper to check if a date is in completions
function isCompletedOn(day, completions, year, month) {
  return completions.some(c => {
    const d = new Date(c.date);
    return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
  });
}


export default function Dashboard({ user }) {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editHabit, setEditHabit] = useState(null);
  const [activeTag, setActiveTag] = useState('');
  const [showFilterBar, setShowFilterBar] = useState(false);

  // Collect all unique tags from habits
  const allTags = Array.from(new Set(habits.flatMap(h => (h.categories || [])))).filter(Boolean);

  const fetchHabits = async () => {
    setLoading(true);
    try {
  const res = await API.get('/api/habits', {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      setHabits(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch habits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAdd = async (form) => {
    try {
  await API.post('/api/habits', form, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      setShowForm(false);
      fetchHabits();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to add habit');
    }
  };

  const handleEdit = (habit) => {
    setEditHabit(habit);
    setShowForm(true);
  };

  const handleUpdate = async (form) => {
    try {
  await API.put(`/api/habits/${editHabit._id}`, form, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      setEditHabit(null);
      setShowForm(false);
      fetchHabits();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update habit');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this habit?')) return;
    try {
  await API.delete(`/api/habits/${id}`, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      fetchHabits();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete habit');
    }
  };

  const handleCheckIn = async (id) => {
    try {
  await API.post(`/api/habits/${id}/checkin`, {}, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      fetchHabits();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Check-in failed');
    }
  };

  // Filter habits by activeTag if set
  const filteredHabits = activeTag
    ? habits.filter(h => (h.categories || []).includes(activeTag))
    : habits;

  return (
    <div className="container">
    <div className= " head">
        <h2>Your Habits</h2>
      <div className="dashboard-header">
        <button className="button" onClick={() => { setShowForm(true); setEditHabit(null); }}>Add Habit</button>
        {allTags.length > 0 && (
          <button className={"button" + (showFilterBar ? " button-active" : "")} onClick={() => setShowFilterBar(v => !v)}>
            Filter
          </button>
        )}
      </div>
    </div>
      
      {/* Tag Filter Bar (shows only when showFilterBar is true) */}
      {showFilterBar && allTags.length > 0 && (
        <div className="filter-bar">
          <span className="filter-label">Filter by tag:</span>
          <button
            className={"button" + (!activeTag ? " button-active" : "")}
            onClick={() => setActiveTag('')}
          >All</button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={"button dashboard-tag-btn" + (activeTag === tag ? " button-active" : "")}
              onClick={() => setActiveTag(tag)}
            >{tag}</button>
          ))}
        </div>
      )}
      {showForm && (
        <HabitForm
          initial={editHabit || {}}
          onSubmit={editHabit ? handleUpdate : handleAdd}
          onCancel={() => { setShowForm(false); setEditHabit(null); }}
        />
      )}
      {loading ? <div>Loading...</div> : null}
        {error && <div className="error-message">{error}</div>}
      <div>
        {filteredHabits.map(habit => {
          // Progress bar: percent of days checked in this month
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth();
          const days = getDaysInMonth(year, month);
          const completions = habit.completions || [];
          const completedDays = days.filter(day => isCompletedOn(day, completions, year, month));
          const percent = Math.round((completedDays.length / days.length) * 100);

          return (
            <div className="card" key={habit._id} style={{ padding: 0, overflow: 'hidden' }}>
              <div className="habit-card-inner">
                <div className="habit-card-title">{habit.name}</div>
                <div className="habit-card-meta">
                  <span style={{ fontWeight: 500 }}>Frequency:</span> <span>{habit.frequency}</span>
                  <span style={{ fontWeight: 500 }}>Tags:</span>
                  <span style={{ display: 'flex', gap: 4 }}>
                    {(habit.categories || []).length > 0 ? habit.categories.map((tag, i) => (
                      <span key={i} className="tag-chip">{tag}</span>
                    )) : '—'}
                  </span>
                  <span style={{ fontWeight: 500 }}>Streak:</span> <span>{habit.streak}</span>
                </div>
              </div>
              <div className="habit-card-divider"></div>
              {/* Progress Bar */}
              <div className="progress-section">
                <div className="progress-label">This Month's Progress</div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: percent + '%' }}></div>
                </div>
                <div className="progress-bar-info">{completedDays.length} / {days.length} days</div>
              </div>
              {/* Completion Calendar */}
              <div className="calendar-section">
                <div className="calendar-label">Completion Calendar ({now.toLocaleString('default', { month: 'long' })})</div>
                <div className="calendar-days">
                  {days.map(day => (
                    <div key={day}
                      className={
                        'calendar-day ' + (isCompletedOn(day, completions, year, month) ? 'completed' : 'incomplete')
                      }
                    >{day}</div>
                  ))}
                </div>
              </div>
              <div className="habit-card-divider"></div>
              <div className="habit-card-actions">
                <button className="button" onClick={() => handleCheckIn(habit._id)}>Check In</button>
                <button className="button dashboard-edit-btn" onClick={() => handleEdit(habit)}>Edit</button>
                <button className="button dashboard-delete-btn" onClick={() => handleDelete(habit._id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
