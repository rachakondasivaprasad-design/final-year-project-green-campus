const express = require('express');
const { getAlerts, updateAlertStatus } = require('../controllers/alert.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

const router = express.Router();

router.use(protect);
router.get('/', getAlerts);
router.put('/:id', authorize('ADMIN', 'COORDINATOR', 'STAFF'), updateAlertStatus);

module.exports = router;
