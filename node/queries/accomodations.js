var pool = require('../db.js')
const format = require('pg-format');

// add query functions
function getAccomodationsPerPlaces(req, res, next) {
  pool.query('select equipments_id as id from accomodations where places_id = $1',[req.params.id],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getAllAccomodations(req, res, next) {
  pool.query('select accomodations.id, accomodations.places_id, accomodations.equipments_id from accomodations join places on accomodations.places_id = places.id join equipments on accomodations.equipments_id = equipments.id',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function addAccomodations(req, res, next) {
  let query = [];
  req.body.equipments.forEach(val => {
    query.push([val,req.body.places])
  })
  console.log(query);
  pool.query(format('insert into accomodations (equipments_id,places_id) values %L',query),(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

function deleteAccomodations(req, res, next) {
  pool.query(format(`delete from accomodations where places_id = ${req.body.places} and equipments_id in (%L)`,req.body.equipments),(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
    getAllAccomodations: getAllAccomodations,
    getAccomodationsPerPlaces : getAccomodationsPerPlaces,
    addAccomodations : addAccomodations,
    deleteAccomodations : deleteAccomodations
};