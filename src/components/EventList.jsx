import React from 'react';

    function EventList({ events, setEditingEvent, deleteEvent }) {
      return (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              {event.title} - {event.date} {event.time} <br />
              Workers: {event.registeredWorkers}/{event.requiredWorkers} <br />
              Heavy Lifting: {event.heavyLifting ? 'Yes' : 'No'}
              <button onClick={() => setEditingEvent(event)}>Edit</button>
              <button onClick={() => deleteEvent(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      );
    }

    export default EventList;
