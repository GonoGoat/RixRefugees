var pool = require('../db.js');
const check = require('../validators.js');
const errors = require('../errors.js');

// add query functions
function getValidAvailabilitiesPerSessionsTasks(req, res, next) {
  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query('select availabilities.id,users_id,sessions_tasks_id, concat(users.lname, \' \', users.fname) as username, isavailAssigned(availabilities.id) as isassigned from availabilities join users on users.id = availabilities.users_id where availabilities.sessions_tasks_id = $1 and availabilities.iscanceled = false',[req.params.id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function getAvailabilitiesPerUser(req, res, next) {
  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query('select id,description,iscanceled,users_id,sessions_tasks_id,to_char(updatedate,\'DD/MM/YYYY HH24:MI\') as updatedate from availabilities where users_id = $1',[req.params.id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function getAvailabilitiesInfo(req, res, next) {
  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query('select id,description,to_char(updatedate,\'DD/MM/YYYY HH24:MI\') as updatedate,sessions_tasks_id, case when iscanceled = true then \'Annulée\' when iscanceled = false then \'En cours\' else \'Inconnu\' end as iscanceled from availabilities where id = $1',[req.params.id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows[0]);
  })
}

function addNewAvailabilities(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["tasks","sessions_tasks","availabilities"],req.body)])
  if (body !== true) {
    return body;
  }

  body = check.checkForm(res,[check.hasProperties(["name"],req.body.tasks)])
  if (body !== true) {
    return body;
  }

  body = check.checkForm(res,[check.hasProperties(["description","amountofpeople","start_date","end_date","sessions_id"],req.body.sessions_tasks)])
  if (body !== true) {
    return body;
  }

  body = check.checkForm(res,[check.hasProperties(["description","users_id"],req.body.availabilities)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.sessions_tasks.sessions_id),
    check.validFk(req.body.availabilities.users_id),
    check.limitedText(req.body.tasks.name,40),
    check.noNegativeInt(req.body.sessions_tasks.amountofpeople),
    check.validDates(req.body.sessions_tasks.start_date,req.body.sessions_tasks.end_date)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query('select id,to_char(start_date,\'YYYY-MM-DD\') as start_date,to_char(end_date,\'YYYY-MM-DD\') from sessions where id = $1',[req.body.sessions_tasks.sessions_id]
  ,(err,rows) =>  {
    if (err) return errors(res,err);
    if ((new Date(rows.rows[0].start_date) > new Date(req.body.sessions_tasks.start_date)) || (new Date(rows.rows[0].end_date) < new Date(req.body.sessions_tasks.end_date))) return res.status(405).send("Veuillez sélectionner des dates à l'intérieur de la session concernée.")

    pool.query('insert into tasks (name) values ($1) returning id',[req.body.tasks.name],(err,rows) =>  {
      if (err) return errors(res,err);
      let tasks_id = rows.rows[0].id;

      pool.query('insert into sessions_tasks (isfromadmin,description,amountofpeople,start_date,end_date,tasks_id,sessions_id) values ($1,$2,$3,$4,$5,$6,$7) returning id',[false,req.body.sessions_tasks.description,req.body.sessions_tasks.amountofpeople,req.body.sessions_tasks.start_date, req.body.sessions_tasks.end_date,tasks_id, req.body.sessions_tasks.sessions_id],(err,rows) =>  {
        if (err) return errors(res,err);
        let sessions_tasks_id = rows.rows[0].id

        pool.query('insert into availabilities (description,iscanceled,users_id,sessions_tasks_id) values ($1,$2,$3,$4)',
        [req.body.availabilities.description,false,req.body.availabilities.users_id, sessions_tasks_id],(err,rows) =>  {
          if (err) return errors(res,err);
          return res.send({data : true});
        });
      })
    });
  })
}

function addAvailabilities(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["description","users_id","sessions_tasks_id"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.users_id),
    check.validFk(req.body.sessions_tasks_id),
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query('insert into availabilities (description,iscanceled,users_id,sessions_tasks_id) values ($1,$2,$3,$4)',[req.body.description,false,req.body.users_id, req.body.sessions_tasks_id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send({data : true});
  });
}

function cancelAvailabilities(req, res, next) {
  let verif = check.checkForm(res,[check.validFk(req.body.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query('update availabilities set iscanceled=true, updatedate = now() where id = ($1)',[req.body.id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send({data : true});
  })
}

function updateAvailabilities(req, res, next) {
  let verif = check.checkForm(res,[check.validFk(req.body.id)])
  if (verif !== true) {
    return verif;
  }
  
  pool.query('update availabilities set description=$1, updatedate = now() where id = ($2)',[req.body.description,req.body.id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send({data : true});
  })
}

module.exports = {
  getValidAvailabilitiesPerSessionsTasks : getValidAvailabilitiesPerSessionsTasks,
  getAvailabilitiesInfo : getAvailabilitiesInfo,
  getAvailabilitiesPerUser : getAvailabilitiesPerUser,
  addAvailabilities : addAvailabilities,
  addNewAvailabilities : addNewAvailabilities,
  updateAvailabilities : updateAvailabilities,
  cancelAvailabilities : cancelAvailabilities
};