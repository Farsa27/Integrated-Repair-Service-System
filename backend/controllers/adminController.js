import User from '../models/User.js';
import Professional from '../models/Professional.js';
import Appointment from '../models/Appointment.js';
import Service from '../models/Service.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'customer' });
    const totalProfessionals = await Professional.countDocuments();
    const totalServices = await Service.countDocuments({ isActive: true });
    const totalAppointments = await Appointment.countDocuments();
    const completedAppointments = await Appointment.countDocuments({ status: 'completed' });
    const totalRevenue = await Appointment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$finalPrice' } } }
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProfessionals,
        totalServices,
        totalAppointments,
        completedAppointments,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'customer' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getAllProfessionals = async (req, res) => {
  try {
    const professionals = await Professional.find()
      .populate('userId', 'name email phone')
      .populate('services', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      professionals
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const verifyProfessional = async (req, res) => {
  try {
    const professional = await Professional.findByIdAndUpdate(
      req.params.id,
      { isVerified: true, documentsVerified: true },
      { new: true }
    );

    if (!professional) {
      return res.status(404).json({ 
        success: false, 
        message: 'Professional not found' 
      });
    }

    res.json({
      success: true,
      message: 'Professional verified successfully',
      professional
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const rejectProfessional = async (req, res) => {
  try {
    const { reason } = req.body;
    
    const professional = await Professional.findByIdAndUpdate(
      req.params.id,
      { isVerified: false, notes: reason },
      { new: true }
    );

    if (!professional) {
      return res.status(404).json({ 
        success: false, 
        message: 'Professional not found' 
      });
    }

    res.json({
      success: true,
      message: 'Professional rejected',
      professional
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('customerId', 'name email phone')
      .populate('professionalId')
      .populate('serviceId', 'name')
      .sort({ appointmentDate: -1 });

    res.json({
      success: true,
      appointments
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getServiceReports = async (req, res) => {
  try {
    const serviceStats = await Appointment.aggregate([
      {
        $group: {
          _id: '$serviceId',
          totalBookings: { $sum: 1 },
          completedBookings: { 
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } 
          },
          totalRevenue: { 
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, '$finalPrice', 0] } 
          }
        }
      },
      {
        $lookup: {
          from: 'services',
          localField: '_id',
          foreignField: '_id',
          as: 'serviceDetails'
        }
      },
      { $sort: { totalBookings: -1 } }
    ]);

    res.json({
      success: true,
      stats: serviceStats
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
