const Alert = require('../models/Alert');
const { syncAnomaliesToAlerts } = require('../services/alert.service');

// @desc    Get all system alerts
// @route   GET /api/v1/alerts
// @access  Private
const getAlerts = async (req, res, next) => {
  try {
    const { severity, status, category } = req.query;
    await syncAnomaliesToAlerts();

    const query = {};
    if (severity && severity !== 'All') query.severity = severity;
    if (status && status !== 'All') query.status = status;
    if (category && category !== 'All') query.category = category;

    const alerts = await Alert.find(query)
      .sort({ createdAt: -1 })
      .populate('acknowledgedBy', 'name email');

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update alert status (Acknowledge / Resolve)
// @route   PUT /api/v1/alerts/:id
// @access  Private (ADMIN, COORDINATOR, STAFF)
const updateAlertStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    let alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({ success: false, error: 'Alert not found' });
    }

    alert.status = status || alert.status;
    if (status === 'ACKNOWLEDGED' || status === 'RESOLVED') {
      alert.acknowledgedBy = req.user._id;
      alert.acknowledgedAt = new Date();
    }

    await alert.save();

    res.status(200).json({
      success: true,
      data: alert
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlerts,
  updateAlertStatus
};
