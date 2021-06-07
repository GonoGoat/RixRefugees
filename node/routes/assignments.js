var express = require('express');
var router = express.Router();

var db = require('../queries/assignments');


router.get('/me', db.getAssignmentsPerUser);
router.post('/add/admins', db.addAdminAssignments);
router.post('/add/users',db.addUsersAssignments);
router.delete('/delete/friends',db.deleteAssignmentsPerFriends)
router.delete('/delete/users',db.deleteAssignmentsPerUsers)


module.exports = router;