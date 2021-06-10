var express = require('express');
var router = express.Router();

var db = require('../queries/sessions_tasks');
var badRoute = require('../queries/badRoute');

router.get('/', db.getAllSessionsTasks);
router.get('/available', db.getAvailableSessionsTasks);
router.get('/:id',db.getSessionsTasksInfo);
router.get('/desc/:id',db.getSessionsTasksDesc);
router.get('/sessions/:id',db.getSessionsTasksPerSessions);
router.post('/add',db.addSessionsTasks);
router.delete('/delete',db.deleteSessionsTasks);
router.put('/update',db.updateSessionsTasks);

router.use('*',badRoute);

module.exports = router;