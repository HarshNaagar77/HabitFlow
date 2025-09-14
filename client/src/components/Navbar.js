import React from 'react';
import '../css/components.css';

export default function Navbar({ user, onLogout, mainTab, setMainTab }) {
  return (
    <nav className="container nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
      <div className="logo" style={{ fontWeight: 700, fontSize: 22 }}>HabitFlow</div>
      {user && (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <span
              className={mainTab === 'dashboard' ? 'navlink navlink-active' : 'navlink'}
              onClick={() => setMainTab('dashboard')}
              style={{ cursor: 'pointer' }}
            >Dashboard</span>
            <span
              className={mainTab === 'friends' ? 'navlink navlink-active' : 'navlink'}
              onClick={() => setMainTab('friends')}
              style={{ cursor: 'pointer' }}
            >Feed</span>
          </div>
        </div>
      )}
      {user && (
        <div className="user" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="welcome">Welcome, {user.username}</span>
          <button className="button" onClick={onLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}
