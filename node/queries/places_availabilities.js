var pool = require('../db.js')

// add query functions
function getAllPlacesAvail(req, res, next) {
  pool.query('select name,start_avail,end_avail from places_availabilities join places on places_availabilities.places_id = places.id',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

module.exports = {
    getAllPlacesAvail: getAllPlacesAvail,
};