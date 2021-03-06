var pool = require('../db.js')
const format = require('pg-format');
const errors = require('../errors.js');
const check = require('../validators.js');
const moment = require("moment");
const auth = require('../auth');
const cypher = require('../cypher');

// add query functions
function getAllSessionsTasks(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  pool.query('select sessions_tasks.id, isfromadmin, concat(to_char(start_date,\'YYYY-MM-DD\'),\'T\',to_char(start_date, \'HH24:MI\')) as start_date,concat(to_char(end_date,\'YYYY-MM-DD\'),\'T\',to_char(end_date, \'HH24:MI\')) as end_date,amountofpeople, tasks.id as tasks_id,tasks.name, sessions_id from sessions_tasks join tasks on tasks.id = sessions_tasks.tasks_id' 
  ,(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function getAvailableSessionsTasks(req, res, next) {
  pool.query(('select sessions_tasks.id,amountofpeople, tasks.id as tasks_id,tasks.name,sessions_tasks.description,sessions_id, concat(to_char(sessions_tasks.start_date,\'YYYY-MM-DD\'),\'T\',to_char(sessions_tasks.start_date, \'HH24:MI\')) as start_date, concat(to_char(sessions_tasks.end_date,\'YYYY-MM-DD\'),\'T\',to_char(sessions_tasks.end_date, \'HH24:MI\')) as end_date from sessions_tasks join tasks on tasks.id = sessions_tasks.tasks_id join sessions on sessions.id = sessions_tasks.sessions_id where sessions.end_date >= now() and isfromadmin is true and hasEnoughAssignments(sessions_tasks.id) != amountofpeople'),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function getSessionsTasksInfo(req, res, next) {
  let perm = auth(req,res,false)
  if (perm !== true) {
    return perm
  }

  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query(('select sessions_tasks.id, tasks.id as tasks_id,tasks.name,sessions_tasks.description,sessions_id, users.lname, users.fname, to_char(sessions_tasks.start_date,\'DD/MM/YYYY HH24:MI\') as start_date, to_char(sessions_tasks.end_date,\'DD/MM/YYYY HH24:MI\') as end_date from sessions_tasks join tasks on tasks.id = sessions_tasks.tasks_id join sessions on sessions.id = sessions_tasks.sessions_id join users on sessions.users_id = users.id where sessions_tasks.id = $1'),[parseInt(req.params.id)]
  ,(err,rows) =>  {
    if (err) return errors(res,err);
    let info = rows.rows[0];
    info.username = `${cypher.decodeString(info.lname)} ${cypher.decodeString(info.fname)}`
    delete info.fname;
    delete info.lname;
    return res.send(rows.rows[0]);
  })
}

function getSessionsTasksPerSessions(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query('select sessions_tasks.id, isfromadmin, amountofpeople, sessions_id, tasks.id as tasks_id,tasks.name, concat(to_char(start_date,\'YYYY-MM-DD\'),\'T\',to_char(start_date, \'HH24:MI\')) as start_date, concat(to_char(end_date,\'YYYY-MM-DD\'),\'T\',to_char(end_date, \'HH24:MI\')) as end_date, hasEnoughAssignments(sessions_tasks.id) as assigned from sessions_tasks join tasks on tasks.id = sessions_tasks.tasks_id where sessions_id = $1',[parseInt(req.params.id)]
  ,(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function getSessionsTasksDesc(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query('select id, description from sessions_tasks id where id = $1'
  ,[parseInt(req.params.id)],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows[0]);
  })
}

function addSessionsTasks(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["description","amountofpeople","start_date","end_date","tasks_id","sessions_id"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.sessions_id),
    check.validFk(req.body.tasks_id),
    check.noNegativeInt(req.body.amountofpeople),
    check.validDates(req.body.start_date,req.body.end_date)
  ])
  if (verif !== true) {
    return verif;
  }
  pool.query('select id,to_char(start_date,\'YYYY-MM-DD\') as start_date,to_char(end_date,\'YYYY-MM-DD\') as end_date from sessions where id = $1',[req.body.sessions_id]
  ,(err,rows) =>  {
    if (err) return errors(res,err);
    if ((moment(rows.rows[0].start_date).isAfter(moment(req.body.start_date),'day'))|| (moment(rows.rows[0].end_date).isBefore(moment(req.body.end_date),'day'))) return res.status(405).send("Veuillez sélectionner des dates à l'intérieur de la session concernée.")

    pool.query('insert into sessions_tasks (isfromadmin,description,amountofpeople,start_date,end_date,tasks_id,sessions_id) values ($1,$2,$3,$4,$5,$6,$7)'
    ,[true,req.body.description,req.body.amountofpeople,req.body.start_date,req.body.end_date,req.body.tasks_id, req.body.sessions_id],(err,rows) =>  {
      if (err) return errors(res,err);
      return res.send(`La tâche de session a bien été ajoutée.`);
    })
  })
}

function deleteSessionsTasks(req, res, next) {
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

  pool.query(format('delete from sessions_tasks where id in (%L)',req.body),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`${req.body.length} tâche${req.body.length > 1 ? "s ont bien été supprimées" : " a bien été supprimée"} dans la session demandée.`);
  })
}

function updateSessionsTasks(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  console.log(req.body);
  let body = check.checkForm(res,[check.hasProperties(["description","amountofpeople","start_date","end_date","tasks_id","sessions_id","isfromadmin","id"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.sessions_id),
    check.validFk(req.body.tasks_id),
    check.validFk(req.body.id),
    check.noNegativeInt(req.body.amountofpeople),
    check.validDates(req.body.start_date,req.body.end_date)
  ])
  if (verif !== true) {
    return verif;
  }
  pool.query('select id,to_char(start_date,\'YYYY-MM-DD\') as start_date,to_char(end_date,\'YYYY-MM-DD\') as end_date from sessions where id = $1',[req.body.sessions_id]
  ,(err,rows) =>  {
    if (err) return errors(res,err);
    if ((moment(rows.rows[0].start_date).isAfter(moment(req.body.start_date),'day'))|| (moment(rows.rows[0].end_date).isBefore(moment(req.body.end_date),'day'))) return res.status(405).send("Veuillez sélectionner des dates à l'intérieur de la session concernée.")
    
    pool.query('update sessions_tasks set isfromadmin = $1, description = $2, amountofpeople = $3, start_date = $4, end_date = $5, tasks_id = $6, sessions_id = $7 where id = $8',[Boolean(req.body.isfromadmin),req.body.description,req.body.amountofpeople,req.body.start_date,req.body.end_date,req.body.tasks_id, req.body.sessions_id, req.body.id],(err,rows) =>  {
      if (err) return errors(res,err);
      return res.send(`La tâche de session a bien été modifiée.`);
    })
  })
}

module.exports = {
  getAllSessionsTasks: getAllSessionsTasks,
  getAvailableSessionsTasks : getAvailableSessionsTasks,
  getSessionsTasksDesc : getSessionsTasksDesc,
  getSessionsTasksInfo : getSessionsTasksInfo,
  getSessionsTasksPerSessions : getSessionsTasksPerSessions,
  addSessionsTasks : addSessionsTasks,
  deleteSessionsTasks : deleteSessionsTasks,
  updateSessionsTasks : updateSessionsTasks
};