const EnvironmentalRecord = require('../models/EnvironmentalRecord');

// @desc    Get all environmental records with pagination, filtering & search
// @route   GET /api/v1/environment
// @access  Private
const getRecords = async (req, res, next) => {
  try {
    const { category, building, year, month, search, page = 1, limit = 20 } = req.query;

    const query = {};
    if (category && category !== 'All') query.category = category;
    if (building && building !== 'All') query.building = building;
    if (year) query.year = parseInt(year);
    if (month) query.month = parseInt(month);

    if (search) {
      query.$or = [
        { building: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { notes: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await EnvironmentalRecord.countDocuments(query);
    const records = await EnvironmentalRecord.find(query)
      .populate('recordedBy', 'name email role')
      .sort({ year: -1, month: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: records.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: records
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single environmental record
// @route   GET /api/v1/environment/:id
// @access  Private
const getRecordById = async (req, res, next) => {
  try {
    const record = await EnvironmentalRecord.findById(req.params.id).populate('recordedBy', 'name email role');
    if (!record) {
      return res.status(404).json({ success: false, error: 'Record not found' });
    }
    res.status(200).json({ success: true, data: record });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new environmental record
// @route   POST /api/v1/environment
// @access  Private (ADMIN, COORDINATOR, STAFF)
const createRecord = async (req, res, next) => {
  try {
    req.body.recordedBy = req.user._id;
    const record = await EnvironmentalRecord.create(req.body);
    res.status(201).json({
      success: true,
      data: record
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update environmental record
// @route   PUT /api/v1/environment/:id
// @access  Private (ADMIN, COORDINATOR)
const updateRecord = async (req, res, next) => {
  try {
    let record = await EnvironmentalRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, error: 'Record not found' });
    }

    record = await EnvironmentalRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete environmental record
// @route   DELETE /api/v1/environment/:id
// @access  Private (ADMIN, COORDINATOR)
const deleteRecord = async (req, res, next) => {
  try {
    const record = await EnvironmentalRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, error: 'Record not found' });
    }

    await record.deleteOne();
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord
};
