var express = require('express');
var router = express.Router();

var db = require('../queries/sessions_tasks');


router.get('/', db.getAllSessionsTasks);
router.get('/available', db.getAvailableSessionsTasks);
router.get('/:id',db.getSessionsTasksInfo);
router.post('/add',db.addSessionsTasks);
router.delete('/delete',db.deleteSessionsTasks);
router.put('/update',db.updateSessionsTasks);

module.exports = router;