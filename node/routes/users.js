var express = require('express');
var router = express.Router();

var db = require('../queries/users');

router.get('/admin',db.getAllAdminUsers);
//router.get('/', db.getAllSessions);
//router.get('/:id',db.getSessionsInfo);
/*router.post('/add',db.addPlaces);
router.delete('/delete',db.deletePlaces);
router.put('/update',db.updatePlaces);*/


module.exports = router;