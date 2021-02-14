var pool = require('../db.js');

// add query functions
function getAllPlacesAvail(req, res, next) {
  pool.query('select places_availabilities.id,name,bed_quantity,to_char(start_avail,\'DD/MM/YYYY HH24:MI\') as start_avail,to_char(end_avail,\'DD/MM/YYYY HH24:MI\') as end_avail from places_availabilities join places on places_availabilities.places_id = places.id',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function addPlacesAvail(req, res, next) {
  pool.query('insert into places_availabilities (start_avail,end_avail,bed_quantity,places_id) values ($1,$2,$3,$4)',
  [req.body.start_avail,req.body.end_avail,req.body.bed_quantity,req.body.places_id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
    getAllPlacesAvail: getAllPlacesAvail,
    addPlacesAvail : addPlacesAvail
};