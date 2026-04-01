const bcrypt = require('bcrypt');
const User = require('../models/user');
const AppError = require('../utils/AppError');

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Insufficient info', 400));
    }
    const existingUser = await User.findOne({email});
    if (existingUser){
      return next (new AppError('Cannot use this email try a dufferent one.',400));
    }
    


    const userCreated = await User.create({
      email,
      password
    });

    userCreated.password = undefined;

    res.status(201).json({
      status: 'success',
      data: userCreated,
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup};