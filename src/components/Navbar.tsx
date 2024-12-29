import { LogOut, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button className="text-white focus:outline-none">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-shadow-md">
            Community Center
          </h1>
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-shadow-sm">
              {user.name}
            </span>
            <button
              onClick={logout}
              className="p-2 hover:bg-indigo-700 rounded-full focus:outline-none transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}