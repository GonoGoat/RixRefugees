var pool = require('../db.js')
const format = require("pg-format");
const errors = require('../errors.js');
const check = require('../validators.js');

// add query functions
function getAllTasks(req, res, next) {
  pool.query('select * from tasks',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function addTasks(req, res, next) {
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

  pool.query('insert into tasks (name) values ($1)',[req.body.name],(err,rows) =>  {
    if (err) throw err;
    return res.send(`La tâche a bien été ajoutée.`);
  })
}

function deleteTasks(req, res, next) {
  let verif = check.checkForm(res,[
    check.arrayOfValidFk(req.body)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query(format('delete from tasks where id in (%L)',req.body),(err,rows) =>  {
    if (err) throw err;
    return res.send(`${req.body.length} tâche${req.body.length > 1 ? "s ont bien été supprimées" : " a bien été supprimée"}.`);
  })
}

function updateTasks(req, res, next) {
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

  pool.query('update tasks set name = $1 where id = $2',[req.body.name,req.body.id],(err,rows) =>  {
    if (err) throw err;
    return res.send(`La tâche a bien été modifiée.`);
  })
}

module.exports = {
  getAllTasks: getAllTasks,
  addTasks : addTasks,
  deleteTasks : deleteTasks,
  updateTasks : updateTasks
};