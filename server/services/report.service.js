const Report = require('../models/Report');
const { calculateEnvironmentalScore } = require('./scoring.service');
const { getAnalyticsData } = require('./analytics.service');
const aiService = require('./ai.service');

const generateReport = async ({ title, type, period, year, month, userId }) => {
  const scoreData = await calculateEnvironmentalScore(year, month);
  const analyticsData = await getAnalyticsData(null, null, year);
  const aiAnalysis = await aiService.runCampusAnalysis();

  const dataSummary = {
    overallScore: scoreData.overallScore,
    scoreBreakdown: scoreData.breakdown,
    percentageChanges: analyticsData.percentageChanges,
    buildingTotals: analyticsData.buildingComparison
  };

  const insightsSummary = aiAnalysis.insights.map((i) => `[${i.category}] ${i.title}: ${i.description}`);
  const recommendationsSummary = aiAnalysis.recommendations.map((r) => `[${r.priority}] ${r.title}: ${r.action}`);

  const report = await Report.create({
    title: title || `${type} Environmental Audit Report - ${period}`,
    type: type || 'MONTHLY',
    period: period || `${month}/${year}`,
    year: parseInt(year) || 2026,
    month: month ? parseInt(month) : 1,
    score: scoreData.overallScore,
    dataSummary,
    insightsSummary,
    recommendationsSummary,
    generatedBy: userId
  });

  return report;
};

module.exports = { generateReport };
