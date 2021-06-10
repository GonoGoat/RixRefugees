var express = require('express');
var router = express.Router();

var db = require('../queries/tasks');
var badRoute = require('../queries/badRoute');

router.get('/', db.getAllTasks);
router.post('/add',db.addTasks);
router.delete('/delete',db.deleteTasks);
router.put('/update',db.updateTasks);

router.use('*',badRoute);

module.exports = router;