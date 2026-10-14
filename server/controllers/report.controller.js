const Report = require('../models/Report');
const { generateReport } = require('../services/report.service');

// @desc    Get all generated reports
// @route   GET /api/v1/reports
// @access  Private
const getReports = async (req, res, next) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 }).populate('generatedBy', 'name email');
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single report by ID
// @route   GET /api/v1/reports/:id
// @access  Private
const getReportById = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id).populate('generatedBy', 'name email');
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }
    res.status(200).json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate a new report
// @route   POST /api/v1/reports/generate
// @access  Private (ADMIN, COORDINATOR)
const createNewReport = async (req, res, next) => {
  try {
    const { title, type, period, year, month } = req.body;
    const report = await generateReport({
      title,
      type,
      period,
      year: year || 2026,
      month: month || 1,
      userId: req.user._id
    });

    res.status(201).json({
      success: true,
      data: report
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReports,
  getReportById,
  createNewReport
};
