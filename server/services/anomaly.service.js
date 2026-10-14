const EnvironmentalRecord = require('../models/EnvironmentalRecord');

/**
 * Detects anomalies across environmental parameters by comparing current readings
 * against historical averages.
 */
const detectAnomalies = async () => {
  try {
    const records = await EnvironmentalRecord.find().sort({ year: -1, month: -1 });

    if (!records || records.length === 0) {
      return [];
    }

    const anomalies = [];

    // Group records by category and building
    const grouped = {};
    records.forEach((record) => {
      const key = `${record.category}_${record.building || 'Main Campus'}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(record);
    });

    Object.keys(grouped).forEach((key) => {
      const recs = grouped[key];
      if (recs.length < 2) return;

      const [category, building] = key.split('_');
      const latest = recs[0];
      const previousRecords = recs.slice(1);

      let latestVal = 0;
      let metricName = 'consumption';

      if (category === 'Electricity') {
        latestVal = Number(latest.metrics?.consumption || 0);
        metricName = 'Electricity Consumption (kWh)';
      } else if (category === 'Water') {
        latestVal = Number(latest.metrics?.consumption || 0);
        metricName = 'Water Usage (Liters)';
      } else if (category === 'Waste') {
        latestVal = Number(latest.metrics?.quantity || 0);
        metricName = 'Total Waste Generated (kg)';
      } else if (category === 'Paper') {
        latestVal = Number(latest.metrics?.consumption || 0);
        metricName = 'Paper Usage (reams)';
      }

      if (latestVal === 0) return;

      // Calculate historical average
      let sum = 0;
      let count = 0;
      previousRecords.forEach((prev) => {
        let val = 0;
        if (category === 'Electricity') val = Number(prev.metrics?.consumption || 0);
        else if (category === 'Water') val = Number(prev.metrics?.consumption || 0);
        else if (category === 'Waste') val = Number(prev.metrics?.quantity || 0);
        else if (category === 'Paper') val = Number(prev.metrics?.consumption || 0);

        if (val > 0) {
          sum += val;
          count++;
        }
      });

      if (count === 0) return;
      const historicalAverage = sum / count;
      const percentageDiff = ((latestVal - historicalAverage) / historicalAverage) * 100;

      // Threshold check: Spikes > 20%
      if (percentageDiff > 20) {
        anomalies.push({
          id: `ANOM_${category}_${latest.year}_${latest.month}`,
          category,
          building,
          parameter: metricName,
          period: `${latest.month}/${latest.year}`,
          currentValue: latestVal,
          historicalAverage: Math.round(historicalAverage),
          percentageChange: Math.round(percentageDiff),
          severity: percentageDiff > 40 ? 'CRITICAL' : 'WARNING',
          description: `Spike detected in ${building}: ${metricName} is ${Math.round(percentageDiff)}% above historical average (${Math.round(historicalAverage)}).`
        });
      }
    });

    return anomalies;
  } catch (error) {
    console.error('Error detecting anomalies:', error);
    return [];
  }
};

module.exports = { detectAnomalies };
