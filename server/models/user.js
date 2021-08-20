const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Please enter a username'],
    lowercase: true,
  },
  fullName: {
    type: String,
    required: [true, 'Please enter your Name'],
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [2, 'Password too short']
  },
  bio: {
    type: String,
  },
  publicId: String,
  bioPhotoId: String,
}, { timestamps: true });

// fire a function before saved
// don't use an arrow function if you want access to this
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// static method to login user
userSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username })
  if (user) {
    const auth  = bcrypt.compare(password, user.password)
      if (auth) {
        return user
      }
      throw Error('incorrect password')
  }
  throw Error('incorrect username')
}

const User = mongoose.model("User", userSchema);
module.exports = User;
