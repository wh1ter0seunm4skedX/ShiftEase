import { useState, useEffect } from 'react';
import { Event } from '../types';
import { mockUsers } from '../data/mockData';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newEvent: Event) => void;
  onUpdate: (updatedEvent: Event) => void;
  event: Event | null;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  event,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [maxWorkers, setMaxWorkers] = useState(1);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date);
      setMaxWorkers(event.maxWorkers);
    } else {
      setTitle('');
      setDescription('');
      setDate('');
      setMaxWorkers(1);
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent = {
      id: event?.id || String(Date.now()),
      title,
      description,
      date,
      maxWorkers,
      registeredWorkers: event?.registeredWorkers || 0,
      createdBy: mockUsers[0].id,
    };
    if (event) {
      onUpdate(newEvent);
    } else {
      onCreate(newEvent);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-y-auto h-full w-full bg-black bg-opacity-50 z-50">
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-medium text-gray-900">
              {event ? 'Edit Event' : 'Create New Event'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <form className="mt-2 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label
                htmlFor="maxWorkers"
                className="block text-sm font-medium text-gray-700"
              >
                Max Workers
              </label>
              <input
                type="number"
                id="maxWorkers"
                value={maxWorkers}
                onChange={(e) => setMaxWorkers(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                min="1"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mt-6">
              <button
                type="submit"
                className="w-full md:w-auto px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                {event ? 'Update Event' : 'Create Event'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full md:w-auto px-4 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventModal;