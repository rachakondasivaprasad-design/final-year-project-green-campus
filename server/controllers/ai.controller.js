const aiService = require('../services/ai.service');

// @desc    Run real-time AI environmental analysis
// @route   POST /api/v1/ai/analyze
// @access  Private
const analyzeCampus = async (req, res, next) => {
  try {
    const analysisResult = await aiService.runCampusAnalysis();
    res.status(200).json({
      success: true,
      data: analysisResult
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI Insights
// @route   GET /api/v1/ai/insights
// @access  Private
const getInsights = async (req, res, next) => {
  try {
    const analysisResult = await aiService.runCampusAnalysis();
    res.status(200).json({
      success: true,
      count: analysisResult.insights.length,
      data: analysisResult.insights
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeCampus,
  getInsights
};
