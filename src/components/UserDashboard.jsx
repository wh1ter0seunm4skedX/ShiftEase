import React from 'react';

    function UserDashboard({ events, setEvents }) {
      const registerForEvent = (id) => {
        setEvents(events.map(event => {
          if (event.id === id && event.registeredWorkers < event.requiredWorkers) {
            return { ...event, registeredWorkers: event.registeredWorkers + 1 };
          }
          return event;
        }));
      };

      return (
        <div>
          <h1>User Dashboard</h1>
          <ul>
            {events.map(event => (
              <li key={event.id}>
                {event.title} - {event.date} {event.time} <br />
                Workers: {event.registeredWorkers}/{event.requiredWorkers} <br />
                Heavy Lifting: {event.heavyLifting ? 'Yes' : 'No'}
                {event.registeredWorkers < event.requiredWorkers ? (
                  <button onClick={() => registerForEvent(event.id)}>Register</button>
                ) : (
                  <span>Full</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default UserDashboard;
