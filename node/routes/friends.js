var express = require('express');
var router = express.Router();

var db = require('../queries/friends');

router.get('/',db.getAllFriends);
router.get('/assigned/:id',db.getValidFriendsAssignmentPerSessionsTasks);
//router.get('/admin/unavailable/:id',db.getUnavailableAdminUsersPerSessionsTasks)
router.get('/display/:id', db.getFriendsDisplayInfo);
router.get('/:id',db.getFriendsInfo);
router.post('/add',db.addFriends);
router.delete('/delete',db.deleteFriends);
router.put('/update',db.updateFriends);


module.exports = router;