import React, { useState, useEffect } from 'react';

    function EventForm({ addEvent, updateEvent, editingEvent }) {
      const [title, setTitle] = useState('');
      const [date, setDate] = useState('');
      const [time, setTime] = useState('');
      const [requiredWorkers, setRequiredWorkers] = useState(0);
      const [heavyLifting, setHeavyLifting] = useState(false);
      const [id, setId] = useState(null);

      useEffect(() => {
        if (editingEvent) {
          setTitle(editingEvent.title);
          setDate(editingEvent.date);
          setTime(editingEvent.time);
          setRequiredWorkers(editingEvent.requiredWorkers);
          setHeavyLifting(editingEvent.heavyLifting);
          setId(editingEvent.id);
        } else {
          setTitle('');
          setDate('');
          setTime('');
          setRequiredWorkers(0);
          setHeavyLifting(false);
          setId(null);
        }
      }, [editingEvent]);

      const handleSubmit = (e) => {
        e.preventDefault();
        const event = { id: id || Date.now(), title, date, time, requiredWorkers, heavyLifting, registeredWorkers: 0 };
        id ? updateEvent(event) : addEvent(event);
        setTitle('');
        setDate('');
        setTime('');
        setRequiredWorkers(0);
        setHeavyLifting(false);
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
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Required Workers"
            value={requiredWorkers}
            onChange={(e) => setRequiredWorkers(Number(e.target.value))}
            required
          />
          <label>
            <input
              type="checkbox"
              checked={heavyLifting}
              onChange={(e) => setHeavyLifting(e.target.checked)}
            />
            Heavy Lifting
          </label>
          <button type="submit">{id ? 'Update Event' : 'Add Event'}</button>
        </form>
      );
    }

    export default EventForm;
