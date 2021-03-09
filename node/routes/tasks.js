var express = require('express');
var router = express.Router();

var db = require('../queries/tasks');


router.get('/', db.getAllTasks);
router.post('/add',db.addTasks);
router.delete('/delete',db.deleteTasks);
router.put('/update',db.updateTasks);


module.exports = router;