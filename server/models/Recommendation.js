const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    parameter: {
      type: String,
      required: true
    },
    issue: {
      type: String,
      required: true
    },
    insight: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      enum: ['HIGH', 'MEDIUM', 'LOW'],
      default: 'MEDIUM',
      index: true
    },
    status: {
      type: String,
      enum: ['PROPOSED', 'IN_PROGRESS', 'IMPLEMENTED', 'DISMISSED'],
      default: 'PROPOSED',
      index: true
    },
    estimatedImpact: {
      type: String,
      default: '10-15% efficiency improvement'
    },
    building: {
      type: String,
      default: 'Campus Wide'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Recommendation', RecommendationSchema);
