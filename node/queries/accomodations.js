var pool = require('../db.js')
const format = require('pg-format');
const errors = require('../errors.js');
const check = require('../validators.js');
const auth = require('../auth');

// add query functions
function getAccomodationsPerPlaces(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

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
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  pool.query('select id, places_id, equipments_id from accomodations',(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function addAccomodations(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["equipments","places"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.places),
    check.arrayOfValidFk(req.body.equipments)
  ])
  if (verif !== true) {
    return verif;
  }
  
  let query = [];
  req.body.equipments.forEach(val => {
    query.push([val,req.body.places])
  })
  pool.query(format('insert into accomodations (equipments_id,places_id) values %L',query),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`${req.body.equipments.length} équipement${req.body.equipments.length > 1 ? "s ont bien été ajoutés" : " a bien été ajouté"} du lieu d'hébergement demandé.`);
  })
}

function deleteAccomodations(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["equipments","places"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.places),
    check.arrayOfValidFk(req.body.equipments)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query(format(`delete from accomodations where places_id = ${req.body.places} and equipments_id in (%L)`,req.body.equipments),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`${req.body.equipments.length} équipement${req.body.equipments.length > 1 ? "s ont bien été retirés" : " a bien été retiré"} du lieu d'hébergement demandé.`);
  })
}

module.exports = {
    getAllAccomodations: getAllAccomodations,
    getAccomodationsPerPlaces : getAccomodationsPerPlaces,
    addAccomodations : addAccomodations,
    deleteAccomodations : deleteAccomodations
};