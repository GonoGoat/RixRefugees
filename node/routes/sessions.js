var express = require('express');
var router = express.Router();

var db = require('../queries/sessions');
var badRoute = require('../queries/badRoute');

router.get('/', db.getAllSessions);
router.get('/available', db.getAvailableSessions);
router.get('/:id',db.getSessionsInfo);
router.post('/add',db.addSessions);
router.delete('/delete',db.deleteSessions);
router.put('/update',db.updateSessions);

router.use('*',badRoute);

module.exports = router;