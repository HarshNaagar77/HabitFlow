
import React, { useEffect, useState } from 'react';
import '../css/components.css';
import FriendProfile from './FriendProfile';
import API from '../api';

export default function FriendsFeed() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [friends, setFriends] = useState([]);
  const [feed, setFeed] = useState([]);
  const [error, setError] = useState('');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  // Search users
  const handleSearch = async e => {
    e.preventDefault();
    setError('');
    try {
  const res = await API.get(`/api/users/search?q=${encodeURIComponent(search)}`, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      setResults(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Search failed');
    }
  };

  // Follow user
  const handleFollow = async (userId) => {
    try {
  await API.post(`/api/users/${userId}/follow`, {}, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      fetchFriends();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Follow failed');
    }
  };

  // Unfollow user
  const handleUnfollow = async (userId) => {
    try {
  await API.post(`/api/users/${userId}/unfollow`, {}, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      fetchFriends();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unfollow failed');
    }
  };

  // Fetch friends
  const fetchFriends = async () => {
    try {
  const res = await API.get('/api/users/friends', {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      setFriends(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch friends');
    }
  };

  // Fetch friends feed
  const fetchFeed = async () => {
    try {
  const res = await API.get('/api/users/friends/feed', {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      setFeed(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch feed');
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchFeed();
  }, []);

  if (selectedFriend) {
    return <FriendProfile friendId={selectedFriend} onBack={() => setSelectedFriend(null)} />;
  }
  return (
    <div className="container">
      <h2>Friends Activity Feed</h2>
  <div className="friendsfeed-main">
        {/* Left: Recent Activity */}
  <div className="friendsfeed-activity">
          <h3>Recent Activity</h3>
          {feed.map(item => (
            <div key={item._id} className="card">
              <div><b>{item.user.username}</b> checked in to <b>{item.habit.name}</b></div>
              <div>{new Date(item.date).toLocaleString()}</div>
              <div>Streak: {item.streak}</div>
            </div>
          ))}
        </div>
        {/* Right: Friends List and Add Friend */}
  <div className="friendsfeed-sidebar">
          <div className="friendsfeed-mb16">
            <button className="button friendsfeed-fullwidth" onClick={() => setShowSearch(true)}>Add Friend</button>
          </div>
          {showSearch && (
            <div className="friendsfeed-mb24">
              <form onSubmit={handleSearch} className="friendsfeed-searchform">
                <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." />
                <button className="button" type="submit">Search</button>
                <button className="button friendsfeed-search-cancel" type="button" onClick={() => setShowSearch(false)}>Cancel</button>
              </form>
              {error && <div className="friendsfeed-error">{error}</div>}
              {results.length > 0 && <h3>Search Results</h3>}
              {results.map(user => (
                <div key={user._id} className="card friendsfeed-card-row">
                  <span>{user.username} ({user.email})</span>
                  <button className="button" onClick={() => handleFollow(user._id)}>Follow</button>
                </div>
              ))}
            </div>
          )}
          <div className="your">
            <h3>Your Friends</h3>
            {friends.length === 0 && <div className="friendsfeed-muted">No friends yet.</div>}
            {friends.map(friend => (
              <div key={friend._id} className="card friendsfeed-card-row-pointer">
                <span className="friendsfeed-underline" onClick={() => setSelectedFriend(friend._id)}>{friend.username} ({friend.email})</span>
                <button className="button" style={{ background: '#ef4444' }} onClick={() => handleUnfollow(friend._id)}>Unfollow</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
