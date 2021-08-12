const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
  },
  publicId: String,
});

// user.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique'})

const User = mongoose.model("User", userSchema);
module.exports = User;
