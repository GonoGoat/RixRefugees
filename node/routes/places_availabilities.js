var express = require('express');
var router = express.Router();

var db = require('../queries/places_availabilities');


router.get('/', db.getAllPlacesAvail);
router.post('/add', db.addPlacesAvail);
router.delete('/delete',db.deletePlacesAvail);
router.put('/update',db.updatePlacesAvail);


module.exports = router;