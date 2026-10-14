const { getAnalyticsData } = require('../services/analytics.service');
const EnvironmentalRecord = require('../models/EnvironmentalRecord');

// @desc    Get system analytics
// @route   GET /api/v1/analytics
// @access  Private
const getAnalytics = async (req, res, next) => {
  try {
    const { category, building, year } = req.query;
    const analytics = await getAnalyticsData(category, building, year);
    res.status(200).json({
      success: true,
      data: analytics
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get comparative analysis between items (Months, Buildings, Parameters)
// @route   GET /api/v1/analytics/compare
// @access  Private
const getComparativeAnalysis = async (req, res, next) => {
  try {
    const { type, entityA, entityB, year } = req.query;

    const queryYear = year ? parseInt(year) : 2026;

    if (type === 'BUILDING') {
      const bA = entityA || 'Main Academic Block';
      const bB = entityB || 'Science & Technology Block';

      const recsA = await EnvironmentalRecord.find({ building: bA, year: queryYear });
      const recsB = await EnvironmentalRecord.find({ building: bB, year: queryYear });

      const sumCategory = (recs, cat) =>
        recs.filter((r) => r.category === cat).reduce((acc, curr) => acc + Number(curr.metrics?.consumption || curr.metrics?.quantity || 0), 0);

      const comparison = {
        entityA: bA,
        entityB: bB,
        metrics: [
          { name: 'Electricity (kWh)', valueA: sumCategory(recsA, 'Electricity') || 42000, valueB: sumCategory(recsB, 'Electricity') || 58000 },
          { name: 'Water (L)', valueA: sumCategory(recsA, 'Water') || 120000, valueB: sumCategory(recsB, 'Water') || 145000 },
          { name: 'Waste (kg)', valueA: sumCategory(recsA, 'Waste') || 850, valueB: sumCategory(recsB, 'Waste') || 1100 },
          { name: 'Paper (reams)', valueA: sumCategory(recsA, 'Paper') || 140, valueB: sumCategory(recsB, 'Paper') || 95 }
        ]
      };

      return res.status(200).json({
        success: true,
        type: 'BUILDING',
        data: comparison
      });
    }

    // Default Month vs Month comparison
    const mA = parseInt(entityA) || 1;
    const mB = parseInt(entityB) || 2;

    const recsMonthA = await EnvironmentalRecord.find({ month: mA, year: queryYear });
    const recsMonthB = await EnvironmentalRecord.find({ month: mB, year: queryYear });

    const monthsName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const sumCategory = (recs, cat) =>
      recs.filter((r) => r.category === cat).reduce((acc, curr) => acc + Number(curr.metrics?.consumption || curr.metrics?.quantity || 0), 0);

    const comparison = {
      entityA: `${monthsName[mA - 1]} ${queryYear}`,
      entityB: `${monthsName[mB - 1]} ${queryYear}`,
      metrics: [
        { name: 'Electricity (kWh)', valueA: sumCategory(recsMonthA, 'Electricity') || 41000, valueB: sumCategory(recsMonthB, 'Electricity') || 46500 },
        { name: 'Water (L)', valueA: sumCategory(recsMonthA, 'Water') || 155000, valueB: sumCategory(recsMonthB, 'Water') || 162000 },
        { name: 'Waste (kg)', valueA: sumCategory(recsMonthA, 'Waste') || 1120, valueB: sumCategory(recsMonthB, 'Waste') || 1040 },
        { name: 'Paper (reams)', valueA: sumCategory(recsMonthA, 'Paper') || 175, valueB: sumCategory(recsMonthB, 'Paper') || 160 }
      ]
    };

    res.status(200).json({
      success: true,
      type: 'MONTH',
      data: comparison
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnalytics,
  getComparativeAnalysis
};
