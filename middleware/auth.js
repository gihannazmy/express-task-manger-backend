const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AppError = require('../utils/AppError');



const protect = async(req, res, next) =>{
  try{
    let token;
    if (
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
    )
    {
      token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
      return next(new AppError('You are not logged in!', 401));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decode.id);
    if(!currentUser){
      return next(new AppError('The user no longer exists.', 401));
    } 
    req.user = currentUser;
    next()
  }
  catch (err){
    next(err);
  }
}

module.exports = protect;