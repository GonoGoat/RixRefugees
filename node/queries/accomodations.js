var db = require('../db.js')

// add query functions
function getAllAccomodations(req, res, next) {
  pool.query('select accomodations.id, places.name as places_name, equipments.name as equipments_name from accomodations join places on accomodations.places_id = places.id join equipments on accomodations.equipments_id = equipments.id',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

module.exports = {
    getAllAccomodations: getAllAccomodations,
};