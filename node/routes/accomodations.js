var express = require('express');
var router = express.Router();

var db = require('../queries/accomodations');


router.get('/', db.getAllAccomodations);
router.post('/add', db.addAllAccomodations);
router.delete('/delete',db.deleteAllAccomodations)


module.exports = router;