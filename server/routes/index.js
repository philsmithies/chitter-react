var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.write('<h1>hello world</h1>');
});

module.exports = router;
