const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.model');

// Add admin for tests
const admin = new User(User.hash({ login: 'admin', password: 'admin' }));

const connectToDB = fn => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to DB...');
    admin.save();
    fn();
  });
};

module.exports = { connectToDB };
