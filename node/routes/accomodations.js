var express = require('express');
var router = express.Router();

var db = require('../queries/accomodations');


router.get('/', db.getAllAccomodations);
router.post('/add', db.addAccomodations);


module.exports = router;