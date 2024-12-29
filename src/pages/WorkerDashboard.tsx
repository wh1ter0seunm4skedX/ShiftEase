import { useState } from 'react';
import { mockEvents } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

export default function WorkerDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState(mockEvents);

  const handleRegister = (eventId: string) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId && event.registeredWorkers < event.maxWorkers) {
        return { ...event, registeredWorkers: event.registeredWorkers + 1 };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">Available Events</h1>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-3"
          >
            <h3 className="text-lg md:text-xl font-semibold">{event.title}</h3>
            <p className="text-gray-600 text-sm md:text-base">{event.description}</p>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-gray-500 space-y-2 md:space-y-0">
              <span>Date: {event.date}</span>
              <span>Spots: {event.maxWorkers - event.registeredWorkers} available</span>
            </div>
            <button
              disabled={event.registeredWorkers >= event.maxWorkers}
              className={`w-full py-2 px-4 rounded ${
                event.registeredWorkers >= event.maxWorkers
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
              onClick={() => handleRegister(event.id)}
            >
              {event.registeredWorkers >= event.maxWorkers
                ? 'Full'
                : 'Register'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}