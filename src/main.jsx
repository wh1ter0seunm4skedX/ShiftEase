import React, { useState } from 'react';
    import ReactDOM from 'react-dom';
    import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
    import AdminDashboard from './components/AdminDashboard';
    import UserDashboard from './components/UserDashboard';
    import Login from './components/Login';
    import './index.css';

    const mockUsers = [
      { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
      { id: 2, email: 'worker1@example.com', password: 'worker123', role: 'worker' },
      { id: 3, email: 'worker2@example.com', password: 'worker123', role: 'worker' },
      { id: 4, email: 'worker3@example.com', password: 'worker123', role: 'worker' },
      { id: 5, email: 'worker4@example.com', password: 'worker123', role: 'worker' },
      { id: 6, email: 'worker5@example.com', password: 'worker123', role: 'worker' },
    ];

    function App() {
      const [events, setEvents] = useState([]);
      const [user, setUser] = useState(null);

      const handleLogin = (email, password) => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === password);
        if (foundUser) {
          setUser(foundUser);
        } else {
          alert('Invalid credentials');
        }
      };

      const handleSignOut = () => {
        setUser(null);
      };

      return (
        <Router>
          <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            {user && user.role === 'admin' && (
              <Route path="/admin" element={<AdminDashboard events={events} setEvents={setEvents} onSignOut={handleSignOut} />} />
            )}
            {user && user.role === 'worker' && (
              <Route path="/user" element={<UserDashboard events={events} setEvents={setEvents} onSignOut={handleSignOut} />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      );
    }

    ReactDOM.render(<App />, document.getElementById('root'));
