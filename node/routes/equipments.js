var express = require('express');
var router = express.Router();

var db = require('../queries/equipments');


router.get('/', db.getAllEquipments);


module.exports = router;