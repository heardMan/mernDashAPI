var express = require("express");
var router = express.Router();
var db = require("../models");
var updateDB = require("../db/updateDB");

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/orders", function (req, res) {

  console.log(req.body);

  var queryObj = req.body

  var q = db.Order.find(queryObj, function (err, docs) {
    if (err) {
      console.log(err);
    }
    console.log(docs);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.json(docs);
  });

});

router.get("/shipments", function (req, res) {

  var queryObj = { orderId: "563222673" }

  var q = db.Shipment.find(queryObj, function (err, docs) {
    if (err) {
      console.log(err);
    }
    console.log(docs);
    res.json(docs);
  });

});

router.get("/updatedb", function (req, res) {

  updateDB.init(res);

});

module.exports = router;
