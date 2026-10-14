const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['Electricity', 'Water', 'Waste', 'Paper', 'Transportation', 'GreenSpace', 'Cleanliness', 'General'],
      required: true
    },
    parameter: {
      type: String,
      required: true
    },
    severity: {
      type: String,
      enum: ['INFO', 'WARNING', 'CRITICAL'],
      default: 'INFO',
      index: true
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'],
      default: 'ACTIVE',
      index: true
    },
    triggeredValue: {
      type: Number
    },
    thresholdValue: {
      type: Number
    },
    building: {
      type: String,
      default: 'Main Campus'
    },
    acknowledgedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    acknowledgedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Alert', AlertSchema);
