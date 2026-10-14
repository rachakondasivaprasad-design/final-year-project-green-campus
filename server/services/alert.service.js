const Alert = require('../models/Alert');
const { detectAnomalies } = require('./anomaly.service');

/**
 * Synchronizes detected anomalies with system database Alerts
 */
const syncAnomaliesToAlerts = async () => {
  try {
    const anomalies = await detectAnomalies();

    for (const anomaly of anomalies) {
      const existingAlert = await Alert.findOne({
        category: anomaly.category,
        building: anomaly.building,
        triggeredValue: anomaly.currentValue,
        status: { $ne: 'RESOLVED' }
      });

      if (!existingAlert) {
        await Alert.create({
          title: `High ${anomaly.category} Anomaly Detected`,
          category: anomaly.category,
          parameter: anomaly.parameter,
          severity: anomaly.severity,
          message: anomaly.description,
          status: 'ACTIVE',
          triggeredValue: anomaly.currentValue,
          thresholdValue: anomaly.historicalAverage,
          building: anomaly.building
        });
      }
    }

    return await Alert.find().sort({ createdAt: -1 });
  } catch (error) {
    console.error('Error syncing alerts:', error);
    return [];
  }
};

module.exports = { syncAnomaliesToAlerts };
