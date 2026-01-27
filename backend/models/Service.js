import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String
  },
  image: {
    type: String
  },
  basePriceRange: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  category: {
    type: String,
    enum: ['electrical', 'sanitary', 'gas', 'gardening', 'welding', 'wood', 'plumbing', 'carpentry', 'painting', 'cleaning', 'other'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);
