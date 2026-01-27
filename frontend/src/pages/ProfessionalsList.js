import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfessionalCard from '../components/ProfessionalCard';
import { IoFilter, IoClose } from 'react-icons/io5';

const ProfessionalsList = () => {
  const { serviceId } = useParams();
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState('');
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchProfessionals();
  }, [serviceId, isAuthenticated]);

  useEffect(() => {
    applyFilters();
  }, [professionals, filterRating]);

  const fetchProfessionals = async () => {
    try {
      const response = await axios.get(`/api/professionals/service/${serviceId}`);
      setProfessionals(response.data.professionals);
    } catch (error) {
      console.error('Failed to fetch professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...professionals];

    if (filterRating) {
      filtered = filtered.filter(p => p.rating >= parseInt(filterRating));
    }

    setFilteredProfessionals(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Available Professionals</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Services
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <IoFilter className="text-gray-600" />
              <label className="font-semibold text-gray-700">Filter by Rating:</label>
            </div>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-600"
            >
              <option value="">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>
            {filterRating && (
              <button
                onClick={() => setFilterRating('')}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose size={20} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredProfessionals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No professionals found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map(professional => (
              <ProfessionalCard
                key={professional._id}
                professional={professional}
                serviceId={serviceId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalsList;
