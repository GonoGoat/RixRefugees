var pool = require('../db.js')
const format = require('pg-format')
const errors = require('../errors.js');
const check = require('../validators.js');
const auth = require('../auth');

// add query functions
function getAllEquipments(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  pool.query('select * from equipments',(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function addEquipments(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["name"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[check.limitedText(req.body.name,40)])
  if (verif !== true) {
    return verif;
  }

  pool.query('insert into equipments (name) values ($1)',[req.body.name],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`L'équipement a bien été ajouté.`);
  })
}

function deleteEquipments(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let verif = check.checkForm(res,[check.arrayOfValidFk(req.body)])
  if (verif !== true) {
    return verif;
  }

  pool.query(format('delete from equipments where id in (%L)',req.body),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`${req.body.length} équipement${req.body.length > 1 ? "s ont bien été supprimés" : " a bien été supprimé"}.`);
  })
}

function updateEquipments(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["name","id"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[check.limitedText(req.body.name,40),check.validFk(req.body.id)])
  if (verif !== true) {
    return verif;
  }


  pool.query('update equipments set name = $1 where id = $2',[req.body.name,req.body.id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`L'équipement a bien été modifié.`);
  })
}

module.exports = {
  getAllEquipments: getAllEquipments,
  addEquipments : addEquipments,
  deleteEquipments : deleteEquipments,
  updateEquipments : updateEquipments
};