const Recommendation = require('../models/Recommendation');
const aiService = require('../services/ai.service');

// @desc    Get recommendations (syncs with AI engine)
// @route   GET /api/v1/recommendations
// @access  Private
const getRecommendations = async (req, res, next) => {
  try {
    const { priority, status, category } = req.query;

    // Check existing recommendations
    let recommendations = await Recommendation.find().sort({ createdAt: -1 });

    // If none exist, sync from AI analysis engine
    if (recommendations.length === 0) {
      const aiAnalysis = await aiService.runCampusAnalysis();
      for (const rec of aiAnalysis.recommendations) {
        await Recommendation.create({
          title: rec.title,
          category: rec.category,
          parameter: rec.parameter,
          issue: rec.issue,
          insight: rec.insight,
          action: rec.action,
          priority: rec.priority,
          estimatedImpact: rec.estimatedImpact,
          building: rec.building
        });
      }
      recommendations = await Recommendation.find().sort({ createdAt: -1 });
    }

    const query = {};
    if (priority && priority !== 'All') query.priority = priority;
    if (status && status !== 'All') query.status = status;
    if (category && category !== 'All') query.category = category;

    const filtered = await Recommendation.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: filtered.length,
      data: filtered
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update recommendation status
// @route   PUT /api/v1/recommendations/:id
// @access  Private (ADMIN, COORDINATOR)
const updateRecommendationStatus = async (req, res, next) => {
  try {
    const { status, priority } = req.body;
    let rec = await Recommendation.findById(req.params.id);

    if (!rec) {
      return res.status(404).json({ success: false, error: 'Recommendation not found' });
    }

    if (status) rec.status = status;
    if (priority) rec.priority = priority;

    await rec.save();

    res.status(200).json({
      success: true,
      data: rec
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRecommendations,
  updateRecommendationStatus
};
