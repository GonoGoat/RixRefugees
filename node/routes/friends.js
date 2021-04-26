var express = require('express');
var router = express.Router();

var db = require('../queries/friends');

router.get('/assigned/:id',db.getValidFriendsAssignmentPerSessionsTasks);
//router.get('/admin/unavailable/:id',db.getUnavailableAdminUsersPerSessionsTasks)
//router.get('/', db.getAllSessions);
router.get('/present/:id',db.getPresentsFriendsInfo);
/*router.post('/add',db.addPlaces);
router.delete('/delete',db.deletePlaces);
router.put('/update',db.updatePlaces);*/


module.exports = router;