var express = require('express');
var router = express.Router();

var db = require('../queries/places');


router.get('/', db.getAllPlaces);
router.get('/:id',db.getPlacesInfo);


module.exports = router;