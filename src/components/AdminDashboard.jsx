import React, { useState } from 'react';
    import EventForm from './EventForm';
    import EventList from './EventList';

    function AdminDashboard({ events, setEvents }) {
      const [editingEvent, setEditingEvent] = useState(null);

      const addEvent = (event) => {
        setEvents([...events, event]);
      };

      const updateEvent = (updatedEvent) => {
        setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
        setEditingEvent(null);
      };

      const deleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
      };

      return (
        <div>
          <h1>Admin Dashboard</h1>
          <EventForm addEvent={addEvent} updateEvent={updateEvent} editingEvent={editingEvent} />
          <EventList events={events} setEditingEvent={setEditingEvent} deleteEvent={deleteEvent} />
        </div>
      );
    }

    export default AdminDashboard;
