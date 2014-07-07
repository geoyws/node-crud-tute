var express = require('express');
var router = express.Router();

var Bear = require('../models/bear');

// log everytime someone uses the router
router.use(function(req, res, next) {
  console.log('Something is using our routes!');
  next();
});

// ROUTE '/fakeapi/users/1'
router.route('/fakeapi/users/1')

  .get(function(req, res) {
    var fakeModel = {
      "UserDetailId": "0001",
      "FirstName": "George",
      "LastName": "Yong",
      "Email": "georgeyws@ifca.com.my",
      "Phone": "0162228603",
      "ReportTo": "Carso Leong"
    };
    res.json(fakeModel);
  });

// ROUTE '/fakeapi/myactivity/date'
router.route('/fakeapi/myactivity/date')

  .get(function(req, res) {
    var fakeModel = [
      {
        "Activity": "Bug Fix",
        "AccountDescription": "SP Setia Property",
        "Hours": "3"
      },
      {
        "Activity": "Bug Fix",
        "AccountDescription": "SP Setia Hardware",
        "Hours": "4"
      },
      {
        "Activity": "Bug Fix",
        "AccountDescription": "SP Setia Retail",
        "Hours": "2"
      },
      {
        "Activity": "Meeting",
        "AccountDescription": "SP Setia Property",
        "Hours": "1"
      }
    ];
    res.json(fakeModel);
  });

// ROUTE '/bears'
router.route('/bears')


  // POST to create a bear
  .post(function(req, res) {
    var bear = new Bear();
    bear.name = req.body.name;

    bear.save(function(err) {
      if (err) {res.send(err)};
      res.json({ Message: 'Bear created!' });
    });
  })

  // GET to fetch all the bears
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err) {res.send(err)};
      res.json(bears);
    });
  });


// ROUTE '/bears/:bear_id'
router.route('/bears/:bear_id')

  // GET a specific bear
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) {res.send(err)};
      res.json(bear);
    });
  })

  // PUT a specific bear
  .put(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) {res.send(err)}
      bear.name = req.body.name; // updates the bear's info
      bear.save(function(err) {
        if (err) {res.send(err)};
        res.json({ Message: 'Bear updated!'} );
      });
    });
  })

  // DELETE a specific bear
  .delete(function(req, res) {
    Bear.remove({ _id: req.params.bear_id }, function (err, bear) {
      if (err) {res.send(err)};
      res.json({ Message: 'Bear successfully deleted!' });
    });
  });

router.get('/', function(req, res) {
  res.json({ Message: 'YAY!'});
});

module.exports = router;
