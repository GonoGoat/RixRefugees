var express = require('express');
var router = express.Router();

var db = require('../queries/appointments');


router.get('/', db.getAllAppointments);
//router.get('/:id',db.getSessionsTasksInfo);
router.get('/desc/:id',db.getAppointmentsDesc);
/*
router.post('/add',db.addSessionsTasks);
router.delete('/delete',db.deleteSessionsTasks);
router.put('/update',db.updateSessionsTasks);*/

module.exports = router;