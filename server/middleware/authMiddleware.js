const jwt = require("jsonwebtoken");
const User = require("../models/User");

// we can place in front of any route that need auth
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists and is verified
  if (token) {
    jwt.verify(token, "secret c0de", (err, decodedToken) => {
      if (err) {
        console.timeLog(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// check current user
const checkUser = (req, res, next) => {
  // const token = req.cookies.jwt;
  const token = req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, "secret c0de", async (err, decodedToken) => {
      if (err) {
        res.json({ auth: false, message: err.message });
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.json({ auth: true, username: user.username });
        // req.userId = user
        // console.log(req.userId, "user id")
        next();
      }
    });
  } else {
    res.locals.user = null;
    res.send("give a token");
    next();
  }
};

module.exports = { requireAuth, checkUser };
