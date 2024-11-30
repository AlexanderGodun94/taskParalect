const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');

const User = require('./../../models/User');
async function blockUser(userId, status) {
  try {
    let user = await User.findOne({_id: userId});
    if (!user) throw new AppError({status: 400, message: errorMessages.USER_NOT_FOUND});

    user.set('status', status);
    return user.save();

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = blockUser;

