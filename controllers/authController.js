const User = require("../models/user.js");
const jwt = require('jsonwebtoken')

// handle errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'That email is already registered'
    return errors
  }

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registered'
  }

  if (err.message === 'incorrect password') {
    errors.email = 'that password is not right'
  }

  // validation errors
  if (err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message
    })
  }
  return errors;
};

// 3 days in seconds
const maxAge = 3 * 24 * 60 * 60

const createToken = (id) => {
  return jwt.sign({ id }, 'secret c0de', {
    expiresIn: maxAge
  })
}

module.exports.signup_post = async (req, res) => {
  const { email, password, username, publicId, fullName } = req.body;
  try {
    const user = await User.create({ username, password, publicId, email, fullName });
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    console.log(user)
    // res.status(201).json({ user: user._id });
    res.send('User Created')
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
};

module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { maxAge: maxAge * 1000 });
    // res.status(200).json({user, auth: true});
    res.status(200).json({ user, auth: true });
    // res.send("Successfully Authenticated")
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors, auth: false });
  }
}

module.exports.logout_get = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 })
  res.send("Logged Out")
}