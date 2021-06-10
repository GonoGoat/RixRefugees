var express = require('express');
var router = express.Router();

var db = require('../queries/registrations');
var badRoute = require('../queries/badRoute');

router.get('/', db.getAllRegistrations);
router.get('/:id', db.getRegistrationsDetails);
router.post('/add',db.accept);
router.delete('/delete',db.refuse);

router.use('*',badRoute);

module.exports = router;