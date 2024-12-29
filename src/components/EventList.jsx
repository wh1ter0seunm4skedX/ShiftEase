import React from 'react';

    function EventList({ events, setEditingEvent, deleteEvent }) {
      return (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              {event.title} - {event.date}
              <button onClick={() => setEditingEvent(event)}>Edit</button>
              <button onClick={() => deleteEvent(event.id)}>Delete</button>
            </li>
          ))}
        </ul>
      );
    }

    export default EventList;
