var express = require('express');
var router = express.Router();

var db = require('../queries/registrations');


router.get('/', db.getAllRegistrations);
router.get('/:id', db.getRegistrationsDetails);
router.post('/add',db.accept);
router.delete('/delete',db.refuse);


module.exports = router;