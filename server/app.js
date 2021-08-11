const express = require('express');
const morgan = require("morgan");
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const User = require("./models/user");
const Tweet = require("./models/tweet");
require("dotenv").config();

//----------------------------------------- END OF IMPORTS--------------------------------------------------- //

// connect to mongodb
const PORT = process.env.PORT || 3001;

const dbURI = `mongodb+srv://admin:${process.env.USER_PASSWORD}@cluster0.fm9ki.mongodb.net/chitter?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log(`Connected to Port ${PORT}`))
  // parse the data and then trigger the server when connected
  .then((result) => app.listen(`${PORT}`))
  .catch((err) => console.log(err));

//-----------------------------------------  MIDDLEWARE--------------------------------------------------- //

// allows us to write app and the crud action we want ex. app.get | app.post | app.delete etc...
const app = express();

app.use(express.json()) // =>  allows us to read the request or req body
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(morgan('tiny'))
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
}));

app.use(cookieParser('secretecode'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

//----------------------------------------- END OF MIDDLEWARE--------------------------------------------------- //

// Routes

app.get("/tweets", function (req, res) {
  Tweet.find({}, function (err, tweets) {
    const tweetsMap = [];
    tweets.forEach(function (tweet) {
      tweetsMap.push(tweet);
    });
    res.send(tweetsMap);
  });
});

app.get('/tweets/:id', (req, res) => {
  Tweet.findOne({})
  .then(tweet => {
    if(!tweet) {
      res.status(404).send();
    }
    res.send(tweet);
  }).catch((e) => {
    res.status(400).send(e);
  })
})

app.get("/tweets/create", (req, res) => {
  res.render("new", { title: "New" });
});

app.post("/new", async (req, res) => {
  // res.send(req.user)
  console.log(req.user.tweets);
  try {
    const tweet = new Tweet({
      body: req.body.tweet,
      username: req.user.username,
      userID: req.user._id,
      likes: req.body.likes
    });
    await tweet.save();
    const userTweets = req.user;
    userTweets.tweets.push(tweet);
    await userTweets.save();
    res.redirect("/");
  } catch (err) {
    console.error("Something went wrong", err);
  }
});

// sign up

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

app.post("/signup", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        fullName: req.body.fullName,
        password: hashedPassword,
        email: req.body.email,
        publicId: req.body.publicId
      });
      await newUser.save();
      res.send("User Created");
      console.log(req.user)
    }
  });
});

// log out
app.get("/logout", (req, res) => {
  req.logout();
  res.send("success");
});

// // send user
app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

// profile page

app.get('/profile/:username', (req, res) => {
  User.findOne({username:req.params.username})
  .then(user => {
    if(!user) {
      res.status(404).send();
    }
    res.send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
})


// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(404).render("404", { title: "404" });
//   res.render("error");
// });

module.exports = app;
