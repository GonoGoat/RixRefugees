var express = require('express');
var router = express.Router();

var db = require('../queries/availabilities');


//router.get('/', db.getAllAccomodations);
router.get('/user/:id', db.getAvailabilitiesPerUser);
router.get('/:id', db.getAvailabilitiesInfo);
router.post('/add', db.addAvailabilities);
router.post('/add/new', db.addNewAvailabilities);
//router.delete('/delete',db.deleteAllAccomodations)


module.exports = router;