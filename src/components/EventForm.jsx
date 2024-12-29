import React, { useState, useEffect } from 'react';

    function EventForm({ addEvent, updateEvent, editingEvent }) {
      const [title, setTitle] = useState('');
      const [date, setDate] = useState('');
      const [id, setId] = useState(null);

      useEffect(() => {
        if (editingEvent) {
          setTitle(editingEvent.title);
          setDate(editingEvent.date);
          setId(editingEvent.id);
        } else {
          setTitle('');
          setDate('');
          setId(null);
        }
      }, [editingEvent]);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
          updateEvent({ id, title, date });
        } else {
          addEvent({ id: Date.now(), title, date });
        }
        setTitle('');
        setDate('');
      };

      return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <button type="submit">{id ? 'Update Event' : 'Add Event'}</button>
        </form>
      );
    }

    export default EventForm;
