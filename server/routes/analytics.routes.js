const express = require('express');
const { getAnalytics, getComparativeAnalysis } = require('../controllers/analytics.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);
router.get('/', getAnalytics);
router.get('/compare', getComparativeAnalysis);

module.exports = router;
