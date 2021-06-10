var pool = require('../db.js')
const format = require('pg-format');
const errors = require('../errors.js');
const check = require('../validators.js');
const auth = require('../auth');

// add query functions
function getAllPlaces(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  pool.query('select * from places',(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function getPlacesInfo(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query('select id, address, description from places where id = $1',[parseInt(req.params.id)],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows[0]);
  })
}

function addPlaces(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["name","address","description"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.limitedText(req.body.address,60),
    check.limitedText(req.body.name,40)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query('insert into places (name,address,description) values ($1,$2,$3)',[req.body.name,req.body.address,req.body.description],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`Le lieu d'hébergement a bien été ajouté.`);
  })
}

function deletePlaces(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let verif = check.checkForm(res,[
    check.arrayOfValidFk(req.body)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query(format('delete from places where id in (%L)',req.body),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`${req.body.length} lieu${req.body.length > 1 ? "x ont bien été supprimés" : " a bien été supprimé"}.`);
  })
}

function updatePlaces(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["name","address","description","id"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.limitedText(req.body.address,60),
    check.limitedText(req.body.name,40),
    check.validFk(req.body.id)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query('update places set name=$1, address = $2, description = $3 where id = $4',[req.body.name,req.body.address,req.body.description,req.body.id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`Le lieu d'hébergement a bien modifié.`);
  })
}

module.exports = {
  getAllPlaces: getAllPlaces,
  getPlacesInfo : getPlacesInfo,
  addPlaces : addPlaces,
  deletePlaces : deletePlaces,
  updatePlaces : updatePlaces
};