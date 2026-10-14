const express = require('express');
const {
  getRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord
} = require('../controllers/environment.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getRecords)
  .post(authorize('ADMIN', 'COORDINATOR', 'STAFF'), createRecord);

router
  .route('/:id')
  .get(getRecordById)
  .put(authorize('ADMIN', 'COORDINATOR'), updateRecord)
  .delete(authorize('ADMIN', 'COORDINATOR'), deleteRecord);

module.exports = router;
