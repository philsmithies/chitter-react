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
const bcrypt = require('bcryptjs')
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
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
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

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

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

// app.get('/tweets', function (req, res) {

//   // access the current user with this
//   // console.log(res.locals.currentUser)
//   Tweet.find()
//   .sort({ createdAt: -1 })
//   const tweets = []
//   res.forEach(function(tweet) {
//     tweets.push(tweet)
//   })
//   res.send(tweets)
//   // .then((result) => {
//   //   res.render("index", { title: "All Tweets", tweets: result, user: req.user});
//   // })
//   .catch((err) => {
//     console.log(err)
//   })
// })

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.get('/tweets', function(req, res) {
  Tweet.find( {}, function(err, tweets) {
    const tweetsMap = []
    tweets.forEach(function(tweet) {
      tweetsMap.push(tweet)
    })
    res.send(tweetsMap)
  })
})


app.get("/tweets/create", (req, res) => {
  res.render("new", { title: "New" });
});

app.post('/new', async (req, res) => {
  // res.send(req.user)
  console.log(req.user.tweets)
  try {
    const tweet = new Tweet({
      body: req.body.body,
      username:  req.user.username,
      userID: req.user._id,
    });
    await tweet.save();
    const userTweets = req.user
    userTweets.tweets.push(tweet)
    await userTweets.save();
    res.redirect("/");
  } catch (err) {
    console.error('Something went wrong', err);
  }
});

// sign up

app.get("/signup", (req, res) => {
  res.render("signup", { title: "New" });
});

app.post("/signup", async (req, res, next) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email
  })
  await newUser.save();
  res.send("User Created");
  res.redirect("/");
}
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

// profile page
app.get("/profile/:id", (req, res) => {
  const id = req.params.id
  console.log(id)
  User.findById(id)
    .then(result => {
      res.render('profile', {user: result, title: 'Profile'})
    })
    .catch(err => {
      res.status(404).render('404', {title: 'Blog not found'})
    })
})

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
  res.status(404).render("404", { title: "404" });
  res.render('error');
});

module.exports = app;
