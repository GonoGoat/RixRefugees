var express = require('express');
var router = express.Router();

var db = require('../queries/users');

router.get('/:id',db.getUserWithID);
router.get('/admin',db.getAllAdminUsers);
router.get('/admin/unavailable/:id',db.getUnavailableAdminUsersPerSessionsTasks)
//router.get('/', db.getAllSessions);
//router.get('/:id',db.getSessionsInfo);
router.post('/add',db.addUsers);
router.post('/login',db.login);
/*router.delete('/delete',db.deletePlaces);
router.put('/update',db.updatePlaces);*/


module.exports = router;