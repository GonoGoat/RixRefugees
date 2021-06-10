var express = require('express');
var router = express.Router();

var db = require('../queries/appointments');
var badRoute = require('../queries/badRoute');

router.get('/', db.getAllAppointments);
router.get('/desc/:id',db.getAppointmentsDesc);
router.post('/add',db.addAppointments);
router.delete('/delete',db.deleteAppointments);
router.put('/update',db.updateAppointments);

router.use('*',badRoute);

module.exports = router;