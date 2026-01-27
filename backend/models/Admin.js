import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  adminLevel: {
    type: String,
    enum: ['super_admin', 'moderator'],
    default: 'moderator'
  },
  permissions: [{
    type: String,
    enum: ['manage_users', 'manage_professionals', 'manage_services', 'manage_appointments', 'view_reports', 'manage_admins']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema);
