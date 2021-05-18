var express = require('express');
const { getAccomodationsPerPlaces } = require('../queries/accomodations');
var router = express.Router();

var db = require('../queries/accomodations');


router.get('/', db.getAllAccomodations);
router.get('/places/:id',db.getAccomodationsPerPlaces)
router.post('/add', db.addAccomodations);
router.delete('/delete',db.deleteAccomodations)


module.exports = router;