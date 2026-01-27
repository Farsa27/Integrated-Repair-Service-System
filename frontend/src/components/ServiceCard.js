import React from 'react';
import { IoStar, IoCheckmark } from 'react-icons/io5';

const ServiceCard = ({ service, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition cursor-pointer group"
    >
      <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-6xl group-hover:scale-110 transition">
        {service.icon || '🔧'}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Starting from</p>
            <p className="text-lg font-bold text-blue-600">
              ₹{service.basePriceRange?.min || 0} - ₹{service.basePriceRange?.max || 0}
            </p>
          </div>
          <div className="text-blue-600">→</div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <IoCheckmark className="text-green-500" />
            Find verified professionals
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
