var express = require('express');
var router = express.Router();

var db = require('../queries/donations');


router.get('/', db.getAllDonations);
router.get('/:id', db.getDonations);
router.post('/add',db.addDonations);
router.put('/update',db.updateDonations);


module.exports = router;