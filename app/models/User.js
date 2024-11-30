const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {type: String, allowNull: false, unique: true},
  password: {type: String, allowNull: true},
  status: {
    type:  String,
    enum : ['ACTIVE','NOT_ACTIVE', 'BLOCKED'],
    default: 'ACTIVE'
  },
  firstName: {type: String, allowNull: true},
  lastName: {type: String, allowNull: true},
  lastSession: {type: String, allowNull: true},
  createdAt: {type: Date, default: Date.now},

});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    user.updatedAt = Date.now();
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.method('toJSON', function () {
  return {
    id: this._id,
    email: this.email,
    status: this.status,
    firstName: this.firstName,
    lastName: this.lastName,
    role: 'investor',
  }
});


module.exports = mongoose.model('Users', UserSchema);
