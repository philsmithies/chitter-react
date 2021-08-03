var createError = require('http-errors');
var express = require('express');
const mongoose = require("mongoose");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Tweet = require('./models/tweet')
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get("/new", (req, res) => {
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

app.get('/users', function(req, res) {
  // Photo.find( {}, function(err, photos) {
  //   const photoMap = []
  //   photos.forEach(function(photo) {
  //     photoMap.push(photo)
  //   })
  //   res.send(photoMap)
  // })
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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
