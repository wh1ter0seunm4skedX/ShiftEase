import React, { useState } from 'react';
    import ReactDOM from 'react-dom';
    import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
    import AdminDashboard from './components/AdminDashboard';
    import UserDashboard from './components/UserDashboard';
    import './index.css';

    function App() {
      const [events, setEvents] = useState([]);

      return (
        <Router>
          <nav>
            <Link to="/admin">Admin Dashboard</Link> | <Link to="/user">User Dashboard</Link>
          </nav>
          <Routes>
            <Route path="/admin" element={<AdminDashboard events={events} setEvents={setEvents} />} />
            <Route path="/user" element={<UserDashboard events={events} />} />
          </Routes>
        </Router>
      );
    }

    ReactDOM.render(<App />, document.getElementById('root'));
