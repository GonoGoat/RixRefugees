var express = require('express');
var router = express.Router();

var db = require('../queries/availabilities');


//router.get('/', db.getAllAccomodations);
router.post('/add', db.addAvailabilities);
//router.delete('/delete',db.deleteAllAccomodations)


module.exports = router;