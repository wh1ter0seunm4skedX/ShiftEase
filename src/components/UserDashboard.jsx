import React from 'react';

    function UserDashboard({ events }) {
      return (
        <div>
          <h1>User Dashboard</h1>
          <ul>
            {events.map(event => (
              <li key={event.id}>
                {event.title} - {event.date}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default UserDashboard;
