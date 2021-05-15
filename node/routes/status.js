var express = require('express');
var router = express.Router();

var db = require('../queries/status');

router.get('/',db.getAllStatus);
router.post('/add',db.addStatus);
router.delete('/delete',db.deleteStatus);
router.put('/update',db.updateStatus);


module.exports = router;