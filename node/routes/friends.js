var express = require('express');
var router = express.Router();

var db = require('../queries/friends');

router.get('/',db.getAllPresentsFriends);
router.get('/assigned/:id',db.getValidFriendsAssignmentPerSessionsTasks);
//router.get('/admin/unavailable/:id',db.getUnavailableAdminUsersPerSessionsTasks)
//router.get('/', db.getAllSessions);
router.get('/:id',db.getFriendsInfo);
/*router.post('/add',db.addPlaces);
router.delete('/delete',db.deletePlaces);
router.put('/update',db.updatePlaces);*/


module.exports = router;