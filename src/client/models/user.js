const mongoose = require('mongoose');
// Schema is model of what an object should contain
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// initialize schema called user with properties
const User = new Schema({
  email: String,
  username: String,
  password: { type: String, select: false },
  firstName: String,
  lastName: String,
  role: String,
});

// connects mongoose to passport and user
User.plugin(passportLocalMongoose, { usernameField: 'email' });

// exports model for use elsewhere
module.exports = mongoose.model('User', User);
