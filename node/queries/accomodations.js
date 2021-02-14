var pool = require('../db.js')

// add query functions
function getAllAccomodations(req, res, next) {
  pool.query('select accomodations.id, accomodations.places_id, accomodations.equipments_id from accomodations join places on accomodations.places_id = places.id join equipments on accomodations.equipments_id = equipments.id',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function addAccomodations(req, res, next) {
  req.body.accomodations.forEach(element => {
    pool.query('insert into accomodations (places_id,equipments_id) values ($1,$2)',[req.body.places_id,element],(err,rows) =>  {
      console.log(element);
      if (err) throw err;
    }) 
  });
  return res.send({data : true});
}

module.exports = {
    getAllAccomodations: getAllAccomodations,
    addAccomodations : addAccomodations
};