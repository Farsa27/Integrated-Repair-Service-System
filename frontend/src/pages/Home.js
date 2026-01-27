import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ServiceCard from '../components/ServiceCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const serviceCategories = [
    { name: 'Electrical Services', icon: '⚡', category: 'electrical' },
    { name: 'Sanitary Services', icon: '🚰', category: 'sanitary' },
    { name: 'Gas & Cylinder', icon: '🔥', category: 'gas' },
    { name: 'Gardening Services', icon: '🌿', category: 'gardening' },
    { name: 'Welding & Soldering', icon: '🔗', category: 'welding' },
    { name: 'Wood Services', icon: '🪵', category: 'wood' },
    { name: 'Plumbing Services', icon: '🔧', category: 'plumbing' },
    { name: 'Carpentry', icon: '🪚', category: 'carpentry' },
    { name: 'Painting Services', icon: '🎨', category: 'painting' },
    { name: 'Cleaning Services', icon: '🧹', category: 'cleaning' }
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceClick = (service) => {
    navigate(`/professionals/${service._id}`, { state: { service } });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to RepairHub</h1>
          <p className="text-xl mb-8 opacity-90">
            Your trusted platform for all home and office repair services
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {!isAuthenticated && (
              <>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:shadow-lg transition"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Our Services</h2>
        <p className="text-gray-600 text-center mb-12">
          Choose from our wide range of professional repair and maintenance services
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <ServiceCard
                key={service._id}
                service={service}
                onClick={() => handleServiceClick(service)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 px-4 mt-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose RepairHub?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Verified Professionals</h3>
              <p className="text-gray-600">
                All our service providers are thoroughly verified and rated by customers
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">
                Negotiate prices directly with professionals and get fair deals
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Quick Booking</h3>
              <p className="text-gray-600">
                Book appointments instantly and check professional availability
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
