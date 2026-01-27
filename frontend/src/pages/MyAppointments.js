import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { IoCheckmarkCircle, IoCalendarOutline, IoCall, IoStar } from 'react-icons/io5';

const MyAppointments = () => {
  const { token, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const endpoint = user?.role === 'professional'
        ? '/api/appointments/professional/my-appointments'
        : '/api/appointments/customer/my-appointments';

      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-emerald-100 text-emerald-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredAppointments = appointments.filter(apt => {
    if (activeTab === 'all') return true;
    return apt.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Appointments</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b">
          {['all', 'pending', 'confirmed', 'completed'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize transition ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <IoCalendarOutline className="mx-auto text-gray-400 text-4xl mb-4" />
            <p className="text-gray-600 text-lg">No appointments found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map(appointment => (
              <div key={appointment._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {user?.role === 'professional'
                        ? appointment.customerId?.name
                        : appointment.professionalId?.businessName}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Service: {appointment.serviceId?.name}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full font-semibold capitalize ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <IoCalendarOutline className="text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                        {appointment.preferredTime && ` at ${appointment.preferredTime}`}
                      </p>
                    </div>
                  </div>

                  {user?.role === 'customer' && (
                    <div className="flex items-start gap-3">
                      <IoCall className="text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-semibold text-gray-800">
                          {appointment.professionalId?.phoneNumber}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {appointment.quotedPrice && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-1">Quoted Price</p>
                    <p className="text-2xl font-bold text-blue-600">₹{appointment.quotedPrice}</p>
                  </div>
                )}

                {appointment.status === 'pending' && user?.role === 'professional' && (
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition">
                    Send Quote
                  </button>
                )}

                {appointment.status === 'completed' && !appointment.rating && user?.role === 'customer' && (
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2">
                    <IoStar /> Leave Review
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
