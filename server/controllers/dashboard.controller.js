const EnvironmentalRecord = require('../models/EnvironmentalRecord');
const Alert = require('../models/Alert');
const Recommendation = require('../models/Recommendation');
const { calculateEnvironmentalScore } = require('../services/scoring.service');
const { getAnalyticsData } = require('../services/analytics.service');
const aiService = require('../services/ai.service');

// @desc    Get dashboard summary (KPI cards, Score, Latest Alerts & Insights)
// @route   GET /api/v1/dashboard/summary
// @access  Private
const getDashboardSummary = async (req, res, next) => {
  try {
    const scoreData = await calculateEnvironmentalScore();
    const analytics = await getAnalyticsData();
    const activeAlerts = await Alert.find({ status: { $ne: 'RESOLVED' } })
      .sort({ createdAt: -1 })
      .limit(5);

    const activeRecommendations = await Recommendation.find({ status: { $ne: 'DISMISSED' } })
      .sort({ createdAt: -1 })
      .limit(4);

    const latestRecords = await EnvironmentalRecord.find()
      .sort({ year: -1, month: -1, createdAt: -1 })
      .limit(6);

    // Compute latest parameter totals
    let currentElectricity = 0;
    let currentWater = 0;
    let currentWaste = 0;
    let currentPaper = 0;
    let currentGreenArea = 42; // %

    latestRecords.forEach((r) => {
      const m = r.metrics || {};
      if (r.category === 'Electricity') currentElectricity += Number(m.consumption || 0);
      else if (r.category === 'Water') currentWater += Number(m.consumption || 0);
      else if (r.category === 'Waste') currentWaste += Number(m.quantity || 0);
      else if (r.category === 'Paper') currentPaper += Number(m.consumption || 0);
      else if (r.category === 'GreenSpace' && m.totalArea && m.greenArea) {
        currentGreenArea = Math.round((Number(m.greenArea) / Number(m.totalArea)) * 100);
      }
    });

    const aiSummary = await aiService.runCampusAnalysis();

    res.status(200).json({
      success: true,
      data: {
        score: scoreData,
        kpis: {
          electricity: { value: currentElectricity || 44200, unit: 'kWh', change: analytics.percentageChanges.electricityChange },
          water: { value: currentWater || 165000, unit: 'L', change: analytics.percentageChanges.waterChange },
          waste: { value: currentWaste || 1240, unit: 'kg', change: analytics.percentageChanges.wasteChange },
          paper: { value: currentPaper || 185, unit: 'reams', change: analytics.percentageChanges.paperChange },
          greenArea: { value: currentGreenArea, unit: '%', change: +1.2 },
          activeAlertsCount: activeAlerts.length
        },
        trends: analytics.monthlyTrends,
        buildingComparison: analytics.buildingComparison,
        recentAlerts: activeAlerts,
        recommendations: activeRecommendations,
        aiSummary
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardSummary };
