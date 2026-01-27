import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoStar, IoCall, IoMapPin, IoTime } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfessionalCard = ({ professional, serviceId }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleBookAppointment = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate(`/book-appointment/${professional._id}/${serviceId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{professional.businessName}</h3>
            <p className="text-gray-600 text-sm">{professional.userId?.name}</p>
          </div>
          <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
            <IoStar className="text-yellow-400 mr-1" />
            <span className="font-semibold text-gray-800">{professional.rating.toFixed(1)}</span>
            <span className="text-gray-600 text-sm ml-1">({professional.totalReviews})</span>
          </div>
        </div>

        {professional.bio && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{professional.bio}</p>
        )}

        <div className="space-y-2 mb-4 text-sm text-gray-600">
          {professional.yearsOfExperience && (
            <p className="flex items-center gap-2">
              <IoTime className="text-blue-600" />
              {professional.yearsOfExperience} years experience
            </p>
          )}
          <p className="flex items-center gap-2">
            <IoCall className="text-blue-600" />
            {professional.phoneNumber}
          </p>
        </div>

        <div className="space-y-2 mb-6">
          <h4 className="font-semibold text-gray-800 text-sm">Services:</h4>
          <div className="flex flex-wrap gap-2">
            {professional.services?.map(service => (
              <span
                key={service._id}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {service.name}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleBookAppointment}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ProfessionalCard;
