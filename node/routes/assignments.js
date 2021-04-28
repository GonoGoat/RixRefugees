var express = require('express');
var router = express.Router();

var db = require('../queries/assignments');


router.get('/', db.getAssignmentsPerUser);
router.post('/add/admins', db.addAdminAssignments);
router.post('/add/users',db.addUsersAssignments);
router.delete('/delete/friends',db.deleteAssignmentsPerFriends)


module.exports = router;