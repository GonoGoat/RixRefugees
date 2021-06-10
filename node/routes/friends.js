var express = require('express');
var router = express.Router();

var db = require('../queries/friends');
var badRoute = require('../queries/badRoute');

router.get('/',db.getAllFriends);
router.get('/assigned/:id',db.getValidFriendsAssignmentPerSessionsTasks);
router.get('/display/:id', db.getFriendsDisplayInfo);
router.get('/:id',db.getFriendsInfo);
router.post('/add',db.addFriends);
router.delete('/delete',db.deleteFriends);
router.put('/update',db.updateFriends);

router.use('*',badRoute);

module.exports = router;