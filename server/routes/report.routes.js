const express = require('express');
const { getReports, getReportById, createNewReport } = require('../controllers/report.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

const router = express.Router();

router.use(protect);
router.get('/', getReports);
router.get('/:id', getReportById);
router.post('/generate', authorize('ADMIN', 'COORDINATOR'), createNewReport);

module.exports = router;
