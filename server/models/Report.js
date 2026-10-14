const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['MONTHLY', 'ANNUAL', 'COMPARATIVE'],
      required: true
    },
    period: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    month: {
      type: Number
    },
    score: {
      type: Number,
      default: 0
    },
    dataSummary: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    insightsSummary: {
      type: [String],
      default: []
    },
    recommendationsSummary: {
      type: [String],
      default: []
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Report', ReportSchema);
