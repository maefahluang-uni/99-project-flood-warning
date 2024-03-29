const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword, callback) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    callback(null, isMatch);
  } catch (error) {
    callback(error);
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
