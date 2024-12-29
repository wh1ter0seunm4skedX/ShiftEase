import { useState } from 'react';
import { Plus, Users, Calendar, Bell, X } from 'lucide-react';
import { mockEvents, mockUsers } from '../data/mockData';
import EventModal from '../components/EventModal';
import { Event } from '../types';
import UserManagement from '../components/UserManagement';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleOpenModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateEvent = (newEvent: Event) => {
    setEvents([...events, newEvent]);
    setIsModalOpen(false);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  const getRegisteredUsers = (event: Event) => {
    // Mock logic to get registered users for an event
    const registeredUsers = mockUsers.filter(
      (user) =>
        user.role === 'worker' &&
        event.registeredWorkers > 0 &&
        Math.random() > 0.5
    );
    return registeredUsers;
  };

  const handleNotificationClick = () => {
    alert('Notification Management is under development.');
  };

  const closeSection = () => {
    setActiveSection(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!activeSection ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <button
            onClick={() => setActiveSection('events')}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center space-y-4">
              <Calendar className="h-12 w-12 text-indigo-600" />
              <h2 className="text-xl font-semibold">Event Management</h2>
              <p className="text-gray-600 text-center">
                Create and manage event schedules
              </p>
            </div>
          </button>

          <button
            onClick={() => setActiveSection('users')}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center space-y-4">
              <Users className="h-12 w-12 text-indigo-600" />
              <h2 className="text-xl font-semibold">User Management</h2>
              <p className="text-gray-600 text-center">
                Manage worker accounts and permissions
              </p>
            </div>
          </button>

          <button
            onClick={() => handleNotificationClick()}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center space-y-4">
              <Bell className="h-12 w-12 text-indigo-600" />
              <h2 className="text-xl font-semibold">Notification Management</h2>
              <p className="text-gray-600 text-center">
                Handle system notifications
              </p>
            </div>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {activeSection === 'events'
                ? 'Event Management'
                : activeSection === 'users'
                ? 'User Management'
                : 'Notification Management'}
            </h1>
            <button
              onClick={closeSection}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {activeSection === 'events' && (
            <>
              <div className="flex justify-end mb-6">
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-indigo-700"
                  onClick={handleOpenModal}
                >
                  <Plus className="h-5 w-5" />
                  <span>Create Event</span>
                </button>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-md p-6 space-y-4"
                  >
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Date: {event.date}</span>
                      <span>
                        Workers: {event.registeredWorkers}/{event.maxWorkers}
                      </span>
                    </div>
                    {getRegisteredUsers(event).length > 0 && (
                      <div className="mt-2">
                        <h4 className="text-sm font-medium text-gray-700">
                          Registered Workers:
                        </h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {getRegisteredUsers(event).map((user) => (
                            <li key={user.id}>{user.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex space-x-2">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        onClick={() => handleEditEvent(event)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {isModalOpen && (
                <EventModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  onCreate={handleCreateEvent}
                  onUpdate={handleUpdateEvent}
                  event={selectedEvent}
                />
              )}
            </>
          )}

          {activeSection === 'users' && <UserManagement />}
        </div>
      )}
    </div>
  );
}