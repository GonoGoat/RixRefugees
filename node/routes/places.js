var express = require('express');
var router = express.Router();

var db = require('../queries/places');
var badRoute = require('../queries/badRoute');

router.get('/', db.getAllPlaces);
router.get('/:id',db.getPlacesInfo);
router.post('/add',db.addPlaces);
router.delete('/delete',db.deletePlaces);
router.put('/update',db.updatePlaces);

router.use('*',badRoute);

module.exports = router;