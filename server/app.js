var createError = require('http-errors');
var express = require('express');
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Tweet = require('./models/tweet')
const User = require('./models/user')
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
const PORT = process.env.PORT || 3001 

const dbURI =
 `mongodb+srv://admin:${process.env.USER_PASSWORD}@cluster0.fm9ki.mongodb.net/chitter?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log(`Connected to Port ${PORT}`))
  // parse the data and then trigger the server when connected
  .then((result) => app.listen(`${PORT}`))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// home page

app.get('/', function (req, res) {
  Tweet.find()
  .sort({ createdAt: -1 })
  .then((result) => {
    res.render("index", { title: "All Tweets", tweets: result, user: req.user});
  })
  .catch((err) => {
    console.log(err)
  })
})

app.get("/tweets/create", (req, res) => {
  res.render("new", { title: "New" });
});

app.post("/new", (req, res) => {
  const tweet = new Tweet(req.body)
  console.log(req.body)

  tweet.save()
  .then(result => {
    res.redirect('/')
  })
  .catch((err) => {
    console.log(err)
  })
});

// sign up

app.get("/signup", (req, res) => {
  res.render("signup", { title: "New" });
});

app.post("/signup", (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }).save(err => {
    if (err) { 
      return next(err);
    }
    res.redirect("/");
  });
});

// log in

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

// log out 
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
