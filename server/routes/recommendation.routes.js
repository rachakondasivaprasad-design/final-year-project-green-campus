const express = require('express');
const {
  getRecommendations,
  updateRecommendationStatus
} = require('../controllers/recommendation.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

const router = express.Router();

router.use(protect);
router.get('/', getRecommendations);
router.put('/:id', authorize('ADMIN', 'COORDINATOR'), updateRecommendationStatus);

module.exports = router;
