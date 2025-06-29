import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, User, LogOut } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EventHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link 
              to="/"
              className="px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Events
            </Link>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link 
                    to="/admin"
                    className="px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <div className="ml-3 relative">
                  <div className="flex items-center">
                    <span className="text-gray-700 mr-2">Hello, {user?.name}</span>
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-indigo-600 focus:outline-none transition-colors flex items-center"
                    >
                      <LogOut size={16} className="mr-1" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <div className="px-3 py-2 flex justify-between items-center">
                  <span className="text-gray-700">Hello, {user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-indigo-600 focus:outline-none transition-colors flex items-center"
                  >
                    <LogOut size={16} className="mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-base font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;