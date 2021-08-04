const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tweets: [{type: mongoose.Schema.Types.ObjectId, ref:"Tweet"}],
});

// user.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique'})

const User = mongoose.model("User", userSchema);
module.exports = User;
