const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const User = require('./../../models/User');

async function auth(email, password) {
  try {
    let user = await User.findOne({email: email});
    if (!user) throw new AppError({status: 400, message: errorMessages.USER_NOT_FOUND});
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError({status: 400, message: errorMessages.WRONG_PASSWORD});
    let userObj = user.toJSON();
    userObj.accessToken = jwt.sign(userObj, config.server.secret, {expiresIn: config.server.expiresIn});
    console.log('userObj', userObj)
    return userObj;
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = auth;

