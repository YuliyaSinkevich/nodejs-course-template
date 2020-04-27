// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
const mongoose = require('mongoose');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
};

userSchema.statics.hash = user => {
  const { _id, name, login, password } = user;
  const hash = bcrypt.hashSync(password, 10);

  return { _id, name, login, password: hash };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
