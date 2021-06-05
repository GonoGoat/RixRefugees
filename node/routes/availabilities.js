var express = require('express');
var router = express.Router();

var db = require('../queries/availabilities');

router.get('/assigned/:id', db.getValidAvailabilitiesPerSessionsTasks);
router.get('/user/:id', db.getAvailabilitiesPerUser);
router.get('/:id', db.getAvailabilitiesInfo);
router.post('/add', db.addAvailabilities);
router.post('/add/new', db.addNewAvailabilities);
router.put('/update',db.updateAvailabilities);
router.put('/cancel',db.cancelAvailabilities);


module.exports = router;