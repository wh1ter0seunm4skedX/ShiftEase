import { useState } from 'react';
import { LogOut, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { FaSignOutAlt } from 'react-icons/fa'; // Sign out icon
import { FiMenu } from 'react-icons/fi'; // Menu icon
import ConfirmDialog from './ConfirmDialog';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Left side - Brand */}
          <div className="flex items-center space-x-3">
            <motion.button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ rotate: 90 }} // Rotate effect on hover
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FiMenu className="h-6 w-6" />
            </motion.button>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-shadow-md">
              Community Center
            </h1>
          </div>

          {/* Right side - User Info & Logout */}
          {user && (
            <div className="flex items-center space-x-3">
              <span className="hidden md:inline text-sm font-medium text-shadow-sm">{user.name}</span>
              <motion.button
                className="p-2 hover:bg-indigo-700 rounded-full focus:outline-none"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={handleLogout}
              >
                <FaSignOutAlt className="h-5 w-5" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMenuOpen && user && (
          <motion.div
            className="md:hidden pt-2 pb-3 border-t border-indigo-500 mt-2 bg-white text-indigo-600"
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="px-4 py-2 text-sm font-medium">
              <div className="flex items-center space-x-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src={`https://i.pravatar.cc/150?u=${user.id}`}
                  alt={user.name}
                />
                <span>{user.name}</span>
              </div>
              <motion.button
                className="w-full mt-3 p-2 text-left bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Log Out
              </motion.button>
            </div>
          </motion.div>
        )}
      </nav>

      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
        title="Confirm Sign Out"
        message="Are you sure you want to sign out?"
      />
    </>
  );
}
