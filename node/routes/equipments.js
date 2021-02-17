var express = require('express');
var router = express.Router();

var db = require('../queries/equipments');


router.get('/', db.getAllEquipments);
router.post('/add',db.addEquipments);
router.delete('/delete',db.deleteEquipments);


module.exports = router;