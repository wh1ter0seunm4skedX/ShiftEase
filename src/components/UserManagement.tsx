import React from 'react';
import { mockUsers } from '../data/mockData';
import { motion } from 'framer-motion';

const UserManagement: React.FC = () => {
  return (
    <div className="mt-8">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mockUsers.map((user) => (
          <motion.div
            key={user.id}
            className="bg-white rounded-lg shadow-md p-6 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={`https://i.pravatar.cc/150?u=${user.id}`}
                  alt={user.name}
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-gray-500">{user.role}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 mt-4 justify-between sm:flex-col sm:space-x-0 sm:space-y-2">
              <motion.button
                className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Edit
              </motion.button>
              <motion.button
                className="bg-red-600 text-white px-4 py-2 rounded-md w-full hover:bg-red-700"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
