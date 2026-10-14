const mongoose = require('mongoose');

const EnvironmentalRecordSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Electricity', 'Water', 'Waste', 'Paper', 'Transportation', 'GreenSpace', 'Cleanliness'],
      index: true
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },
    year: {
      type: Number,
      required: true,
      min: 2000,
      max: 2100
    },
    building: {
      type: String,
      default: 'Main Campus'
    },
    department: {
      type: String,
      default: 'Campus Wide'
    },
    // Metrics object storing key-value pairs depending on category
    metrics: {
      // Electricity: consumption (kWh), cost ($)
      // Water: consumption (Liters)
      // Waste: quantity (kg), recycled (kg), nonRecycled (kg), wasteType (string)
      // Paper: consumption (reams)
      // Transportation: transportType (string), estimatedUsage (km/trips), carbonOffset (kg CO2)
      // GreenSpace: totalArea (sq.m), greenArea (sq.m), trees (count), plants (count)
      // Cleanliness: cleanlinessScore (0-100), location (string), remarks (string)
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    notes: {
      type: String,
      default: ''
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

// Compound index for querying by category, year, and month
EnvironmentalRecordSchema.index({ category: 1, year: 1, month: 1 });
EnvironmentalRecordSchema.index({ building: 1 });
EnvironmentalRecordSchema.index({ department: 1 });

module.exports = mongoose.model('EnvironmentalRecord', EnvironmentalRecordSchema);
