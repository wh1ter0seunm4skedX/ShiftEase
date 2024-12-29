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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Add animation classes when modal opens
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

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

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!date) newErrors.date = 'Date is required';
    if (maxWorkers < 1) newErrors.maxWorkers = 'At least one worker is required';
    if (new Date(date) < new Date()) newErrors.date = 'Date cannot be in the past';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const newEvent: Event = {
        id: event?.id || String(Date.now()),
        title: title.trim(),
        description: description.trim(),
        date,
        maxWorkers,
        registeredWorkers: event?.registeredWorkers || 0,
        createdBy: mockUsers[0].id,
      };

      if (event) {
        await onUpdate(newEvent);
      } else {
        await onCreate(newEvent);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting event:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 backdrop-blur-sm bg-black/30 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative transform transition-all duration-300 ${
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-4">
            <h3 className="text-xl font-semibold text-white">
              {event ? 'Edit Event' : 'Create New Event'}
            </h3>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Form fields remain the same, just update their styling */}
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.date ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="maxWorkers" className="text-sm font-medium text-gray-700">
                  Max Workers
                </label>
                <input
                  type="number"
                  id="maxWorkers"
                  value={maxWorkers}
                  onChange={(e) => setMaxWorkers(Number(e.target.value))}
                  className={`w-full px-4 py-2 rounded-lg border transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.maxWorkers ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min="1"
                  required
                />
                {errors.maxWorkers && <p className="text-red-500 text-xs mt-1">{errors.maxWorkers}</p>}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200 disabled:bg-indigo-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    event ? 'Update Event' : 'Create Event'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;