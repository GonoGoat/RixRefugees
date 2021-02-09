var pool = require('../db.js');
var moment = require("moment");

// add query functions
function getAllPlacesAvail(req, res, next) {
  pool.query('select places_availabilities.id,name,bed_quantity,to_char(start_avail,\'DD/MM/YYYY HH24:MI\') as start_avail,to_char(end_avail,\'DD/MM/YYYY HH24:MI\') as end_avail from places_availabilities join places on places_availabilities.places_id = places.id',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

module.exports = {
    getAllPlacesAvail: getAllPlacesAvail,
};