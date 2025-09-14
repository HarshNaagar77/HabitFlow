
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Register from './pages/Register';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import FriendsFeed from './pages/FriendsFeed';
import Navbar from './components/Navbar';


function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');
  const [mainTab, setMainTab] = useState('dashboard');
  // Auto-login if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      axios.get('/api/auth/me', {
        headers: { 'Authorization': 'Bearer ' + token }
      })
        .then(res => {
          if (res.data && res.data.user) {
            setUser(res.data.user);
            setPage('dashboard');
          }
        })
        .catch(() => {});
    }
    // eslint-disable-next-line
  }, []);

  const handleRegister = () => setPage('login');
  const handleLogin = (user) => {
    setUser(user);
    setPage('dashboard');
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setPage('login');
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} mainTab={mainTab} setMainTab={setMainTab} />
      {user ? (
        <>
          {mainTab === 'dashboard' ? <Dashboard user={user} /> : <FriendsFeed user={user} />}
        </>
      ) : (
        page === 'register' ? (
          <Register onRegister={handleRegister} />
        ) : (
          <Login onLogin={handleLogin} />
        )
      )}
      {!user && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          {page === 'login' ? (
            <span className="span">Don&apos;t have an account? <div className="l" onClick={() => setPage('register')}>Register</div></span>
          ) : (
            <span  className="span">Already have an account? <div className="l" onClick={() => setPage('login')}>Login</div></span>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
