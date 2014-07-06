var express = require('express');
var router = express.Router();

var bear = require('../models/bear.js');

// log everytime someone uses the router
router.use(function(req, res, next) {
  console.log('Something is using our routes!');
  next();
});

// POST to create a bear
router.route('/bears').post(function(req, res) {
  var bear = new Bear();
  bear.name = req.body.name;

  bear.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ Message: 'Bear created!' });
  });
});`

// basic GET
router.get('/', function(req, res) {
  res.json({ Message: 'YAY!'});
});

module.exports = router;
