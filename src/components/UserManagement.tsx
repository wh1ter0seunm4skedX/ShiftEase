import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { getUsers, createUser, updateUser, deleteUser } from '../lib/api';
import UserModal from './UserModal';
import ConfirmDialog from './ConfirmDialog';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    userId: string | null;
  }>({ show: false, userId: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (userId: string) => {
    setDeleteConfirm({ show: true, userId });
  };

  const handleCreateUser = async (userData: Omit<User, 'id'>) => {
    try {
      const newUser = await createUser(userData);
      setUsers(prevUsers => [...prevUsers, newUser]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (userId: string, userData: Partial<User>) => {
    try {
      const updatedUser = await updateUser(userId, userData);
      setUsers(prevUsers =>
        prevUsers.map(user => user.id === userId ? updatedUser : user)
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setDeleteConfirm({ show: false, userId: null });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="mt-8">
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
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
                onClick={() => handleEditClick(user)}
              >
                Edit
              </motion.button>
              <motion.button
                className="bg-red-600 text-white px-4 py-2 rounded-md w-full hover:bg-red-700"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => handleDeleteClick(user.id)}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      {isModalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSave={(userData) => handleUpdateUser(selectedUser.id, userData)}
          onCreate={handleCreateUser}
        />
      )}
      {deleteConfirm.show && (
        <ConfirmDialog
          isOpen={deleteConfirm.show}
          onClose={() => setDeleteConfirm({ show: false, userId: null })}
          onConfirm={() => handleDeleteUser(deleteConfirm.userId!)}
          title="Delete User"
          message="Are you sure you want to delete this user? This action cannot be undone."
        />
      )}
    </div>
  );
};

export default UserManagement;