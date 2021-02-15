var pool = require('../db.js')

// add query functions
function getAllAccomodations(req, res, next) {
  pool.query('select accomodations.id, accomodations.places_id, accomodations.equipments_id from accomodations join places on accomodations.places_id = places.id join equipments on accomodations.equipments_id = equipments.id',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

module.exports = {
    getAllAccomodations: getAllAccomodations,
};