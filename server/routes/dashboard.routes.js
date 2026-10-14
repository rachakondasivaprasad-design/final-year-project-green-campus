const express = require('express');
const { getDashboardSummary } = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);
router.get('/summary', getDashboardSummary);

module.exports = router;
