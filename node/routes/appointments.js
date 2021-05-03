var express = require('express');
var router = express.Router();

var db = require('../queries/appointments');


router.get('/', db.getAllAppointments);
//router.get('/:id',db.getSessionsTasksInfo);
router.get('/desc/:id',db.getAppointmentsDesc);
router.post('/add',db.addAppointments);
router.delete('/delete',db.deleteAppointments);
router.put('/update',db.updateAppointments);

module.exports = router;