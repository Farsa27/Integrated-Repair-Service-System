import Professional from '../models/Professional.js';
import User from '../models/User.js';

export const getProfessionalsByService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    
    const professionals = await Professional.find({
      services: serviceId,
      isVerified: true
    })
      .populate('userId', 'name email phone profilePicture')
      .populate('services', 'name')
      .sort({ rating: -1 });

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

export const getProfessionalById = async (req, res) => {
  try {
    const professional = await Professional.findById(req.params.id)
      .populate('userId', 'name email phone profilePicture address city')
      .populate('services', 'name');

    if (!professional) {
      return res.status(404).json({ 
        success: false, 
        message: 'Professional not found' 
      });
    }

    res.json({
      success: true,
      professional
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const registerProfessional = async (req, res) => {
  try {
    const {
      businessName,
      bio,
      experience,
      services,
      phoneNumber,
      availability,
      bankDetails
    } = req.body;

    const existingProfessional = await Professional.findOne({ userId: req.userId });
    if (existingProfessional) {
      return res.status(400).json({ 
        success: false, 
        message: 'Professional profile already exists' 
      });
    }

    const professional = new Professional({
      userId: req.userId,
      businessName,
      bio,
      experience,
      services,
      phoneNumber,
      availability,
      bankDetails
    });

    await professional.save();

    res.status(201).json({
      success: true,
      message: 'Professional registered successfully',
      professional
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const updateProfessionalProfile = async (req, res) => {
  try {
    const professional = await Professional.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('services', 'name');

    if (!professional) {
      return res.status(404).json({ 
        success: false, 
        message: 'Professional not found' 
      });
    }

    res.json({
      success: true,
      message: 'Professional profile updated successfully',
      professional
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getProfessionalProfile = async (req, res) => {
  try {
    const professional = await Professional.findOne({ userId: req.userId })
      .populate('services', 'name');

    if (!professional) {
      return res.status(404).json({ 
        success: false, 
        message: 'Professional profile not found' 
      });
    }

    res.json({
      success: true,
      professional
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    
    const professional = await Professional.findOneAndUpdate(
      { userId: req.userId },
      { availability },
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
      message: 'Availability updated successfully',
      professional
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const searchProfessionals = async (req, res) => {
  try {
    const { serviceId, city, rating } = req.query;
    
    let query = { isVerified: true };
    
    if (serviceId) query.services = serviceId;
    if (rating) query.rating = { $gte: parseInt(rating) };

    const professionals = await Professional.find(query)
      .populate('userId', 'name email phone profilePicture city')
      .populate('services', 'name')
      .sort({ rating: -1 });

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
