const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const config = require('../../../config');
const jwt = require('jsonwebtoken');

const User = require('./../../models/User');

async function createUser(email, password, firstName, lastName) {
  try {
    const user = await User.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    });
    let userObj = user.toJSON();
    userObj.accessToken = jwt.sign(userObj, config.server.secret, {expiresIn: config.server.expiresIn});
    return userObj;
  } catch (err) {
    if (err.code === 11000) throw new AppError({status: 400, message: errorMessages.EMAIL_EXIST});
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = createUser;

