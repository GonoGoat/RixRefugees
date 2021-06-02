var pool = require('../db.js')
const format = require('pg-format');
const errors = require('../errors.js');
const check = require('../validators.js');

// add query functions
function getAccomodationsPerPlaces(req, res, next) {
  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }
  pool.query('select equipments_id as id from accomodations where places_id = $1',[parseInt(req.params.id)],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function getAllAccomodations(req, res, next) {
  pool.query('select id, places_id, equipments_id from accomodations',(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function addAccomodations(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["equipments","places"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[check.validFk(req.body.places),check.arrayOfValidFk(req.body.equipments)])
  if (verif !== true) {
    return verif;
  }
  
  let query = [];
  req.body.equipments.forEach(val => {
    query.push([val,req.body.places])
  })
  pool.query(format('insert into accomodations (equipments_id,places_id) values %L',query),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send({data : true});
  })
}

function deleteAccomodations(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["equipments","places"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[check.validFk(req.body.places),check.arrayOfValidFk(req.body.equipments)])
  if (verif !== true) {
    return verif;
  }

  pool.query(format(`delete from accomodations where places_id = ${req.body.places} and equipments_id in (%L)`,req.body.equipments),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send({data : true});
  })
}

module.exports = {
    getAllAccomodations: getAllAccomodations,
    getAccomodationsPerPlaces : getAccomodationsPerPlaces,
    addAccomodations : addAccomodations,
    deleteAccomodations : deleteAccomodations
};