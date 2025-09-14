import React, { useEffect, useState } from 'react';
import '../css/components.css';
import axios from 'axios';

export default function FriendProfile({ friendId, onBack }) {
  const [friend, setFriend] = useState(null);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFriend = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/users/${friendId}/profile`, {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
        setFriend(res.data.user);
        setHabits(res.data.habits);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchFriend();
  }, [friendId]);

  return (
    <div className="container">
  <button className="button friendprofile-back-btn" onClick={onBack}>Back</button>
      {loading ? <div>Loading...</div> : null}
  {error && <div className="friendprofile-error">{error}</div>}
      {friend && (
        <div className="card friendprofile-card">
          <h2>{friend.username}'s Habits</h2>
          <div>Email: {friend.email}</div>
        </div>
      )}
      <div>
        {habits.map(habit => (
          <div className="card" key={habit._id}>
            <div className="friendprofile-habit-title">{habit.name}</div>
            <div>Frequency: {habit.frequency}</div>
            <div>Category: {habit.category}</div>
            <div>Streak: {habit.streak}</div>
            <div>Completions: {habit.completions.length}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
