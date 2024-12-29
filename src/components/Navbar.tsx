import { LogOut, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
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
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button 
                className="md:hidden text-white focus:outline-none" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-shadow-md truncate">
                Community Center
              </h1>
            </div>
            {user && (
              <div className="flex items-center space-x-3">
                <span className="hidden md:inline text-sm font-medium text-shadow-sm">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-indigo-700 rounded-full focus:outline-none"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
          
          {/* Mobile menu */}
          {isMenuOpen && user && (
            <div className="md:hidden pt-2 pb-3 border-t border-indigo-500 mt-2">
              <div className="px-2 text-sm font-medium">
                {user.name}
              </div>
            </div>
          )}
        </div>
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