var pool = require('../db.js')
var format = require('pg-format');
const cypher = require('../cypher');
const errors = require('../errors.js');
const check = require('../validators.js');

// add query functions
function getAllStatus(req, res, next) {
  pool.query('select * from status',(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows.map((obj) => {
      return {
        id : obj.id,
        name : cypher.decodeString(obj.name)
      }
    }));
  })
}

function addStatus(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["name"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.limitedText(req.body.name,40)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query('insert into status (name) values ($1)',[cypher.encodeString(req.body.name)],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`Le statut a bien été ajouté.`);
  })
}

function deleteStatus(req, res, next) {
  let verif = check.checkForm(res,[
    check.arrayOfValidFk(req.body)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query(format('delete from status where id in (%L)',req.body),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`${req.body.length} statut${req.body.length > 1 ? "s ont bien été supprimés" : " a bien été supprimé"}.`);
  }) 
}

function updateStatus(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["name","id"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(id),
    check.limitedText(req.body.name,40)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query('update status set name = $1 where id = $2',[cypher.encodeString(req.body.name),req.body.id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`Le statut a bien été modifié.`);
  })
}

module.exports = {
  getAllStatus: getAllStatus,
  addStatus : addStatus,
  deleteStatus : deleteStatus,
  updateStatus : updateStatus
};