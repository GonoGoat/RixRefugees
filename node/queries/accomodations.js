var pool = require('../db.js')

// add query functions
function getAllAccomodations(req, res, next) {
  pool.query('select accomodations.id, accomodations.places_id, accomodations.equipments_id from accomodations join places on accomodations.places_id = places.id join equipments on accomodations.equipments_id = equipments.id',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function addAllAccomodations(req, res, next) {
  console.log(req.body);
  let e = req.body.equipments;
  e.map((obj) => {
    pool.query('insert into accomodations (equipments_id,places_id) values ($1,$2)',[obj,req.body.places],(err,rows) =>  {
      if (err) throw err;
    })
  })
  return res.send({data : true});
}

function deleteAllAccomodations(req, res, next) {
  pool.query('delete from accomodations where places_id = ($1)',[req.body.places_id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
    getAllAccomodations: getAllAccomodations,
    addAllAccomodations : addAllAccomodations,
    deleteAllAccomodations : deleteAllAccomodations
};