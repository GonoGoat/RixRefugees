var express = require('express');
var router = express.Router();

var db = require('../queries/assignments');


router.get('/', db.getAllAccomodations);
router.post('/add/admins', db.addAdminAssignments);
router.delete('/delete',db.deleteAllAccomodations)


module.exports = router;