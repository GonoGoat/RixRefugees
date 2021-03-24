var express = require('express');
var router = express.Router();

var db = require('../queries/sessions');


router.get('/', db.getAllSessions);
router.get('/available', db.getAvailableSessions);
router.get('/:id',db.getSessionsInfo);
router.post('/add',db.addSessions);
router.delete('/delete',db.deleteSessions);
router.put('/update',db.updateSessions);

module.exports = router;