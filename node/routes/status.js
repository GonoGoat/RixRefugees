var express = require('express');
var router = express.Router();

var db = require('../queries/status');
var badRoute = require('../queries/badRoute');

router.get('/',db.getAllStatus);
router.post('/add',db.addStatus);
router.delete('/delete',db.deleteStatus);
router.put('/update',db.updateStatus);

router.use('*',badRoute);

module.exports = router;