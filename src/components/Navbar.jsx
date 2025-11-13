import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FaLeaf, FaUser, FaHome, FaTrophy, FaTasks } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';

import toast from 'react-hot-toast';
import { LogOut } from 'lucide-react';
import { AuthContext } from '../provider/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/', icon: <FaHome className="inline-block mr-2" /> },
    {
      name: 'Challenges',
      path: '/challenges',
      icon: <FaTrophy className="inline-block mr-2" />,
    },
    {
      name: 'My Activities',
      path: '/my-activities',
      icon: <FaTasks className="inline-block mr-2" />,
    },
  ];

  const handleLogOut = async () => {
    logOut()
      .then(() => toast.success('You Logged Out Successfully!'))
      .catch(() => toast.error('Logout failed! Please try again.'));
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const handleNavClick = path => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-[Inter]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center space-x-2 text-gray-900"
            >
              <FaLeaf className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold">
                Eco<span className="text-green-600">Track</span>
              </span>
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {navigation.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.path)}
                  className={`font-medium transition-all duration-200 flex items-center ${
                    isActive
                      ? 'text-green-600 border-b-2 border-green-600 pb-1'
                      : 'text-gray-500 hover:text-green-600'
                  }`}
                >
                  {item.icon} {item.name}
                </button>
              );
            })}
          </div>
          {/* User/Profile */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0 relative">
            {user ? (
              <div className="relative group">
                <div className="flex items-center text-gray-700 transition-colors cursor-pointer">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-green-600 flex items-center justify-center relative">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="h-5 w-5 text-white bg-green-600 rounded-full p-1" />
                    )}
                    {/* Hover tooltip for user name */}
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      {user.displayName || 'User'}
                    </span>
                  </div>
                </div>

                {/* Dropdown menu on hover */}
                <div className="absolute right-0 mt-2 w-auto bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 text-sm text-gray-700 font-medium text-center">
                    Name: {user.displayName}
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-700 font-medium border-b mb-1">
                    {user.email}
                  </div>
                  <Link
                    to="/my-activities"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <FaTasks className="mr-2 text-green-600" />
                    My Activities
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <FaUser className="mr-2 text-green-600" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <LogOut className="mr-2 text-red-600" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('/auth/login')}
                  className="text-gray-500 hover:text-green-600 font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('/auth/register')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              {mobileMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map(item => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.path)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium flex items-center ${
                      isActive
                        ? 'text-green-600 bg-green-50 border-l-4 border-green-600'
                        : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon} {item.name}
                  </button>
                );
              })}
            </div>

            {user ? (
              <div className="pt-4 pb-3 border-t border-gray-200 mx-2">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-600 flex items-center justify-center">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="h-6 w-6 text-white bg-green-600 rounded-full p-1" />
                    )}
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-800">
                      {user.displayName || 'User'}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </div>

                <Link
                  to="/my-activities"
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Activities
                </Link>
                <Link
                  to="/profile"
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogOut}
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 mt-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1 px-2">
                <button
                  onClick={() => handleNavClick('/auth/login')}
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('/auth/register')}
                  className="block w-full text-left px-3 py-2 rounded-lg text-base font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
