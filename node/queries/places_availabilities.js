var pool = require('../db.js');
const format = require('pg-format');
const errors = require('../errors.js');
const check = require('../validators.js');
const auth = require('../auth');

// add query functions
function getAllPlacesAvail(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  pool.query('select places_availabilities.id as id,places_id,name,bed_quantity,concat(to_char(start_avail,\'YYYY-MM-DD\'),\'T\',to_char(start_avail, \'HH24:MI\')) as start_avail,concat(to_char(end_avail,\'YYYY-MM-DD\'),\'T\',to_char(end_avail, \'HH24:MI\')) as end_avail from places_availabilities join places on places_availabilities.places_id = places.id',(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function addPlacesAvail(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["start_avail","end_avail","bed_quantity","places_id"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.places_id),
    check.noNegativeInt(req.body.bed_quantity),
    check.validDates(req.body.start_avail,req.body.end_avail)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query('insert into places_availabilities (start_avail,end_avail,bed_quantity,places_id) values ($1,$2,$3,$4)',
  [req.body.start_avail,req.body.end_avail,req.body.bed_quantity,req.body.places_id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`Les disponibilités du lieu d'hébergement ont bien été ajoutées.`);
  })
}

function deletePlacesAvail(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let verif = check.checkForm(res,[check.arrayOfValidFk(req.body)])
  if (verif !== true) {
    return verif;
  }

  pool.query(format('delete from places_availabilities where id in (%L)',req.body),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`${req.body.length} disponibilité${req.body.length > 1 ? "s ont bien été supprimées" : " a bien été supprimée"}.`);
  });
}

function updatePlacesAvail(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["start_avail","end_avail","bed_quantity","places_id","id"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.places_id),
    check.noNegativeInt(req.body.bed_quantity),
    check.validDates(req.body.start_avail,req.body.end_avail),
    check.validFk(req.body.id)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query('update places_availabilities set start_avail = $1,end_avail = $2,bed_quantity = $3,places_id = $4 where id = $5',
  [req.body.start_avail,req.body.end_avail,req.body.bed_quantity,req.body.places_id,req.body.id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`Les disponibilités du lieu d'hébergement ont bien été modifiées.`);
  })
}

module.exports = {
    getAllPlacesAvail: getAllPlacesAvail,
    addPlacesAvail : addPlacesAvail,
    deletePlacesAvail : deletePlacesAvail,
    updatePlacesAvail : updatePlacesAvail
};