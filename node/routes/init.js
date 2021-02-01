var express = require('express');
var router = express.Router();

var db = require('../queries/init');


router.get('/', db.getAllPlaces);


module.exports = router;