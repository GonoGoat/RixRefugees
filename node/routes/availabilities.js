var express = require('express');
var router = express.Router();

var db = require('../queries/availabilities');
var badRoute = require('../queries/badRoute');

router.get('/assigned/:id', db.getValidAvailabilitiesPerSessionsTasks);
router.get('/me', db.getAvailabilitiesPerUser);
router.get('/:id', db.getAvailabilitiesInfo);
router.post('/add', db.addAvailabilities);
router.post('/add/new', db.addNewAvailabilities);
router.put('/update',db.updateAvailabilities);
router.put('/cancel',db.cancelAvailabilities);

router.use('*',badRoute);

module.exports = router;