var express = require('express');
var router = express.Router();
var badRoute = require('../queries/badRoute');

var db = require('../queries/accomodations');


router.get('/', db.getAllAccomodations);
router.get('/places/:id',db.getAccomodationsPerPlaces)
router.post('/add', db.addAccomodations);
router.delete('/delete',db.deleteAccomodations)

router.use('*',badRoute);


module.exports = router;