import React, { useState } from 'react';
    import ReactDOM from 'react-dom';
    import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
    import AdminDashboard from './components/AdminDashboard';
    import UserDashboard from './components/UserDashboard';
    import './index.css';

    const mockEvents = [
      { id: 1, title: 'Art Workshop', date: '2023-11-01', requiredWorkers: 5, registeredWorkers: 0 },
      { id: 2, title: 'Music Festival', date: '2023-11-05', requiredWorkers: 10, registeredWorkers: 0 },
      { id: 3, title: 'Tech Talk', date: '2023-11-10', requiredWorkers: 3, registeredWorkers: 0 },
    ];

    function App() {
      const [events, setEvents] = useState(mockEvents);

      return (
        <Router>
          <nav>
            <Link to="/admin">Admin Dashboard</Link> | <Link to="/user">User Dashboard</Link>
          </nav>
          <Routes>
            <Route path="/admin" element={<AdminDashboard events={events} setEvents={setEvents} />} />
            <Route path="/user" element={<UserDashboard events={events} setEvents={setEvents} />} />
          </Routes>
        </Router>
      );
    }

    ReactDOM.render(<App />, document.getElementById('root'));
