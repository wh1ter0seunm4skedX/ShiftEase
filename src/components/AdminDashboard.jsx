import React from 'react';
    import EventForm from './EventForm';
    import EventList from './EventList';
    import { useNavigate } from 'react-router-dom';

    function AdminDashboard({ events, setEvents, onSignOut }) {
      const navigate = useNavigate();

      const handleSignOut = () => {
        onSignOut();
        navigate('/');
      };

      return (
        <div>
          <h1>Admin Dashboard</h1>
          <button onClick={handleSignOut}>Sign Out</button>
          <EventForm addEvent={(event) => setEvents([...events, event])} />
          <EventList events={events} setEvents={setEvents} />
        </div>
      );
    }

    export default AdminDashboard;
