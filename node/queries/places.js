var pool = require('../db.js')

// add query functions
function getAllPlaces(req, res, next) {
  pool.query('select * from places',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

module.exports = {
  getAllPlaces: getAllPlaces,
};