import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IoLogOut, IoHome, IoSettings, IoCalendar } from 'react-icons/io5';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-2xl font-bold text-blue-600">🔧 RepairHub</span>
        </div>

        {user ? (
          <div className="flex items-center gap-6">
            {user.role === 'admin' && (
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </button>
            )}
            {user.role !== 'admin' && (
              <>
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <IoHome /> Services
                </button>
                <button
                  onClick={() => navigate('/appointments')}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <IoCalendar /> Appointments
                </button>
              </>
            )}

            <div className="flex items-center gap-3 border-l pl-6">
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500 capitalize">{user.role}</p>
              </div>
              <button
                onClick={() => navigate('/profile')}
                className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-600 font-bold"
              >
                {user.name[0]}
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <IoLogOut /> Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate('/admin-login')}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
            >
              Admin
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
