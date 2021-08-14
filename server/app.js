const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
require("dotenv").config();
let TweetModel = require('./models/tweet.js')

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

app.use(express.json()); // =>  allows us to read the request or req body
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE--------------------------------------------------- //

// Routes

const UserControls = require("./controllers/UserController.js");
const TweetControls = require("./controllers/TweetController.js");
const LikeControls = require("./controllers/LikeController.js");

app.get("/users/", UserControls.all);
app.get("/users/:username/tweets", UserControls.getAllTweets);
app.get("/users/create", UserControls.create);
app.get("/users/:username", UserControls.find);

app.get("/tweets/", TweetControls.all);
app.get("/tweets/find/:id", TweetControls.find);
app.post("/tweets/:username/create", TweetControls.create);

app.get("/likes/", LikeControls.all);
app.post("/likes/:id/", LikeControls.create);

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
        publicId: req.body.publicId,
      });
      await newUser.save();
      res.send("User Created");
      console.log(req.user);
    }
  });
});

app.post("/new", async (req, res) => {
      req.body.author = req.user._id;
      let newTweet = new TweetModel(req.body)
      console.log(newTweet);
      await newTweet.save()  
      res.send("Tweet Created");
      // res.json(savedTweet)
});

// create: async(req, res) => {
//   req.body.author = req.user._id;
//   let newTweet = new TweetModel(req.body)
//   console.log(req.body)
//   let savedTweet = await newTweet.save()    
//   res.json(savedTweet)
// }

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

app.get("/profile/:username", (req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(404).send();
      }
      res.send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

module.exports = app;
