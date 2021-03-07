var pool = require('../db.js');

// add query functions
function getAllPlacesAvail(req, res, next) {
  pool.query('select places_availabilities.id as id,places_id,name,bed_quantity,concat(to_char(start_avail,\'YYYY-MM-DD\'),\'T\',to_char(start_avail, \'HH24:MI\')) as start_avail,concat(to_char(end_avail,\'YYYY-MM-DD\'),\'T\',to_char(end_avail, \'HH24:MI\')) as end_avail from places_availabilities join places on places_availabilities.places_id = places.id',(err,rows) =>  {
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

function deletePlacesAvail(req, res, next) {
  let e = req.body;
  e.map((obj) => {
    pool.query('delete from places_availabilities where id = ($1)',[obj],(err,rows) =>  {
      if (err) throw err;
    })
  });
  return res.send({data : true});
}

function updatePlacesAvail(req, res, next) {
  pool.query('update places_availabilities set start_avail = $1,end_avail = $2,bed_quantity = $3,places_id = $4 where id = $5',
  [req.body.start_avail,req.body.end_avail,req.body.bed_quantity,req.body.places_id,req.body.id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
    getAllPlacesAvail: getAllPlacesAvail,
    addPlacesAvail : addPlacesAvail,
    deletePlacesAvail : deletePlacesAvail,
    updatePlacesAvail : updatePlacesAvail
};