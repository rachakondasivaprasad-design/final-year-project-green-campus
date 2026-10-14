const User = require('../models/User');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public (or Admin only)
const register = async (req, res, next) => {
  try {
    const { name, email, password, role, department } = req.body;

    // Check if email exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email address'
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'STAFF',
      department: department || 'General'
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid login credentials'
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid login credentials'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Your account has been deactivated. Contact Admin.'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/v1/auth/logout
// @access  Private
const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
};

// Helper token responder
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const userObj = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
    avatar: user.avatar
  };

  res.status(statusCode).json({
    success: true,
    token,
    user: userObj
  });
};

module.exports = {
  register,
  login,
  getMe,
  logout
};
