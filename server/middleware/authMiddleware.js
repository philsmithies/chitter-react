const jwt = require("jsonwebtoken");
const User = require("../models/User");

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  // const token = req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, "secret c0de", async (err, decodedToken) => {
      if (err) {
        res.json({ auth: false, message: err.message });
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        // res.json({ auth: true, username: user.username });
        req.user = user
        // console.log(req.userId, "user id")
        next();
      }
    });
  } else {
    res.send("No Token");
    next();
  }
};

module.exports = { checkUser };
