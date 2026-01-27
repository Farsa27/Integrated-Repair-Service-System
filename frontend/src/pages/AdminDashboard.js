import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { IoStatsChart, IoPeople, IoCheckmarkDone, IoTrendingUp } from 'react-icons/io5';

const AdminDashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, usersRes, profRes, apptRes] = await Promise.all([
        axios.get('/api/admin/dashboard', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/admin/professionals', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/admin/appointments', { headers: { Authorization: `Bearer ${token}` } })
      ]);

      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users);
      setProfessionals(profRes.data.professionals);
      setAppointments(apptRes.data.appointments);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyProfessional = async (professionalId) => {
    try {
      await axios.put(
        `/api/admin/professionals/${professionalId}/verify`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Professional verified successfully');
      fetchDashboardData();
    } catch (error) {
      console.error('Failed to verify professional:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-purple-100 mt-2">Manage platform operations and monitor metrics</p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalUsers}</p>
                </div>
                <IoPeople className="text-blue-600 text-4xl opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Professionals</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalProfessionals}</p>
                </div>
                <IoCheckmarkDone className="text-green-600 text-4xl opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Appointments</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalAppointments}</p>
                </div>
                <IoStatsChart className="text-purple-600 text-4xl opacity-20" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-800">₹{stats.totalRevenue}</p>
                </div>
                <IoTrendingUp className="text-orange-600 text-4xl opacity-20" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b">
            {['stats', 'professionals', 'users', 'appointments'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold capitalize transition ${
                  activeTab === tab
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {activeTab === 'professionals' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Pending Professional Verifications</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left px-6 py-3 font-semibold text-gray-700">Business Name</th>
                        <th className="text-left px-6 py-3 font-semibold text-gray-700">Contact</th>
                        <th className="text-left px-6 py-3 font-semibold text-gray-700">Status</th>
                        <th className="text-left px-6 py-3 font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {professionals.filter(p => !p.isVerified).map(professional => (
                        <tr key={professional._id} className="border-t hover:bg-gray-50">
                          <td className="px-6 py-4">{professional.businessName}</td>
                          <td className="px-6 py-4">{professional.phoneNumber}</td>
                          <td className="px-6 py-4">
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                              Pending
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleVerifyProfessional(professional._id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                            >
                              Verify
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Registered Users</h2>
                <p className="text-gray-600 mb-4">Total Users: {users.length}</p>
                <div className="space-y-3">
                  {users.slice(0, 10).map(user => (
                    <div key={user._id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <span className="text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Platform Statistics</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 text-sm">Total Services</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalServices}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Completed Appointments</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.completedAppointments}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
