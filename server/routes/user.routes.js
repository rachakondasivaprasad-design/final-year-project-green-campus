const express = require('express');
const { getUsers, updateUser, deleteUser } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

const router = express.Router();

router.use(protect);
router.use(authorize('ADMIN'));

router.route('/').get(getUsers);
router.route('/:id').put(updateUser).delete(deleteUser);

module.exports = router;
