const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private (ADMIN only)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).select('-password');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user details or role
// @route   PUT /api/v1/users/:id
// @access  Private (ADMIN only)
const updateUser = async (req, res, next) => {
  try {
    const { name, role, department, isActive } = req.body;
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    if (name) user.name = name;
    if (role) user.role = role;
    if (department) user.department = department;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private (ADMIN only)
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    await user.deleteOne();
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser
};
