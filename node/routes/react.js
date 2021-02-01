const path = require('path');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('*', (req, res) => {
  res.sendFile(path.resolve('..', 'react-rixrefugees', 'build', 'index.html'));
});

module.exports = router;
