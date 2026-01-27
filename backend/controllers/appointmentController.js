import Appointment from '../models/Appointment.js';
import Professional from '../models/Professional.js';

export const createAppointment = async (req, res) => {
  try {
    const {
      professionalId,
      serviceId,
      appointmentDate,
      preferredTime,
      location,
      description
    } = req.body;

    const appointment = new Appointment({
      customerId: req.userId,
      professionalId,
      serviceId,
      appointmentDate,
      preferredTime,
      location,
      description,
      status: 'pending'
    });

    await appointment.save();

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('customerId', 'name email phone')
      .populate('professionalId')
      .populate('serviceId', 'name');

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    res.json({
      success: true,
      appointment
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const getCustomerAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ customerId: req.userId })
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

export const getProfessionalAppointments = async (req, res) => {
  try {
    const professional = await Professional.findOne({ userId: req.userId });
    
    if (!professional) {
      return res.status(404).json({ 
        success: false, 
        message: 'Professional not found' 
      });
    }

    const appointments = await Appointment.find({ professionalId: professional._id })
      .populate('customerId', 'name email phone')
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

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('serviceId', 'name');

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    res.json({
      success: true,
      message: 'Appointment status updated',
      appointment
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const updateQuotedPrice = async (req, res) => {
  try {
    const { quotedPrice } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { quotedPrice, paymentStatus: 'negotiating' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    res.json({
      success: true,
      message: 'Price quote sent',
      appointment
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const acceptQuote = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { 
        finalPrice: req.body.quotedPrice,
        paymentStatus: 'paid',
        status: 'confirmed'
      },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    res.json({
      success: true,
      message: 'Quote accepted',
      appointment
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { rating, review },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    // Update professional rating
    const professional = await Professional.findById(appointment.professionalId);
    if (professional) {
      const allAppointments = await Appointment.find({
        professionalId: appointment.professionalId,
        rating: { $exists: true, $ne: null }
      });

      const averageRating = allAppointments.reduce((sum, apt) => sum + apt.rating, 0) / allAppointments.length;
      
      professional.rating = averageRating;
      professional.totalReviews = allAppointments.length;
      await professional.save();
    }

    res.json({
      success: true,
      message: 'Review added successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Appointment not found' 
      });
    }

    res.json({
      success: true,
      message: 'Appointment cancelled',
      appointment
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
