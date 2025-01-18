import React, { useState, useEffect } from 'react';
import { Plus, Users, Calendar, Bell, X } from 'lucide-react';
import { Event, User } from '../types';
import { getEvents, getUsers, createEvent, updateEvent, deleteEvent } from '../lib/api';
import EventModal from '../components/EventModal';
import UserManagement from '../components/UserManagement';
import ConfirmDialog from '../components/ConfirmDialog';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  console.log('AdminDashboard - Current user:', user);

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    eventId: string | null;
  }>({ show: false, eventId: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, usersData] = await Promise.all([
          getEvents(),
          getUsers()
        ]);
        setEvents(eventsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleOpenModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateEvent = async (eventData: Omit<Event, 'id'>) => {
    try {
      const newEvent = await createEvent(eventData);
      setEvents(prevEvents => [...prevEvents, newEvent]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleUpdateEvent = async (eventId: string, eventData: Partial<Event>) => {
    try {
      const updatedEvent = await updateEvent(eventId, eventData);
      setEvents(prevEvents =>
        prevEvents.map(event => event.id === eventId ? updatedEvent : event)
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
      setDeleteConfirm({ show: false, eventId: null });
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleNotificationClick = () => {
    alert('Notification Management is under development.');
  };

  const closeSection = () => {
    setActiveSection(null);
  };

  const getRegisteredUsers = (event: Event) => {
    // Mock logic to get registered users for an event
    const registeredUsers = users.filter(
      (user) =>
        user.role === 'worker' &&
        event.registeredWorkers > 0 &&
        Math.random() > 0.5
    );
    return registeredUsers;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!activeSection ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.button
            onClick={() => setActiveSection('events')}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <Calendar className="h-12 w-12 text-indigo-600" />
              <h2 className="text-xl font-semibold">Event Management</h2>
              <p className="text-gray-600 text-center">
                Create and manage event schedules
              </p>
            </div>
          </motion.button>

          <motion.button
            onClick={() => setActiveSection('users')}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <Users className="h-12 w-12 text-indigo-600" />
              <h2 className="text-xl font-semibold">User Management</h2>
              <p className="text-gray-600 text-center">
                Manage worker accounts and permissions
              </p>
            </div>
          </motion.button>

          <motion.button
            onClick={handleNotificationClick}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex flex-col items-center space-y-4">
              <Bell className="h-12 w-12 text-indigo-600" />
              <h2 className="text-xl font-semibold">Notification Management</h2>
              <p className="text-gray-600 text-center">
                Handle system notifications
              </p>
            </div>
          </motion.button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                {activeSection === 'events'
                  ? 'Event Management'
                  : activeSection === 'users'
                  ? 'User Management'
                  : 'Notification Management'}
              </h1>
              <motion.button
                onClick={closeSection}
                className="p-2 hover:bg-gray-100 rounded-full"
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            {activeSection === 'events' && (
              <>
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-indigo-700"
                    onClick={handleOpenModal}
                  >
                    <Plus className="h-5 w-5" />
                    <span>Create Event</span>
                  </button>
                </motion.div>
                <motion.div
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {events.map((event) => (
                    <motion.div
                      key={event.id}
                      className="bg-white rounded-lg shadow-md p-6 space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
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
                        <motion.button
                          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          onClick={() => handleEditEvent(event)}
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => setDeleteConfirm({ show: true, eventId: event.id })}
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          Delete
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <ConfirmDialog
                  isOpen={deleteConfirm.show}
                  onClose={() => setDeleteConfirm({ show: false, eventId: null })}
                  onConfirm={() => handleDeleteEvent(deleteConfirm.eventId as string)}
                  title="Delete Event"
                  message="Are you sure you want to delete this event? This action cannot be undone."
                />
                {isModalOpen && (
                  <EventModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onCreate={handleCreateEvent}
                    onUpdate={handleUpdateEvent}
                    event={selectedEvent}
                    users={users}
                  />
                )}
              </>
            )}

            {activeSection === 'users' && <UserManagement />}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
