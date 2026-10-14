const express = require('express');
const { analyzeCampus, getInsights } = require('../controllers/ai.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);
router.post('/analyze', analyzeCampus);
router.get('/insights', getInsights);

module.exports = router;
