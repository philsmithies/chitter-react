const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const session = require("express-session");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
require("dotenv").config();
let TweetModel = require("./models/tweet.js");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

//----------------------------------------- END OF IMPORTS--------------------------------------------------- //

// connect to mongodb
const PORT = process.env.PORT || 3001;

const dbURI = `mongodb+srv://admin:${process.env.USER_PASSWORD}@cluster0.fm9ki.mongodb.net/chitter?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => console.log(`Connected to Port ${process.env.PORT || PORT}`))
  .then((result) => app.listen(`${process.env.PORT || PORT}`))
  .catch((err) => console.log(err));

//-----------------------------------------  MIDDLEWARE--------------------------------------------------- //

// allows us to write app and the crud action we want ex. app.get | app.post | app.delete etc...
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secr3t',
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
      secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
    }
  })
);

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://gracious-volhard-935a72.netlify.app');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// app.use(
//   cors({
//     origin: "https://gracious-volhard-935a72.netlify.app/",
//     credentials: true,
//   })
// );

//----------------------------------------- END OF MIDDLEWARE--------------------------------------------------- //

// Routes
// app.get('*', checkUser)
const UserControls = require("./controllers/UserController.js");
const TweetControls = require("./controllers/TweetController.js");
// const LikeControls = require("./controllers/LikeController.js");

app.get("/users/", UserControls.all);
app.get("/users/:username/tweets", UserControls.getAllTweets);
app.get("/users/create", UserControls.create);
app.get("/users/:username", UserControls.find);
app.post("/users/:username/update", UserControls.update);

app.get("/tweets/", TweetControls.all);
app.get("/tweets/find/:id", TweetControls.find);
app.post("/tweets/:username/create", TweetControls.create);

// app.get("/likes/", LikeControls.all);
// app.post("/likes/:id/", LikeControls.create);

app.use(authRoutes);

app.post("/new", async (req, res) => {
  req.body.author = req.user._id;
  let newTweet = new TweetModel(req.body);
  console.log(newTweet);
  await newTweet.save();
  res.send("Tweet Created");
  // res.json(savedTweet)
});

// // send user
app.get("/user", (req, res) => {
  res.send(req.user);
   // The req.user stores the entire user that has been authenticated inside of it.
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
