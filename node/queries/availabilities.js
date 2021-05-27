var pool = require('../db.js')

// add query functions
function getValidAvailabilitiesPerSessionsTasks(req, res, next) {
  pool.query
  ('select availabilities.id,users_id,sessions_tasks_id, concat(users.lname, \' \', users.fname) as username, isavailAssigned(availabilities.id) as isassigned from availabilities join users on users.id = availabilities.users_id where availabilities.sessions_tasks_id = $1 and availabilities.iscanceled = false',[req.params.id],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getAvailabilitiesPerUser(req, res, next) {
  pool.query
  ('select id,description,iscanceled,users_id,sessions_tasks_id,to_char(updatedate,\'DD/MM/YYYY HH24:MI\') as updatedate from availabilities where users_id = $1',[req.params.id],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getAvailabilitiesInfo(req, res, next) {
  pool.query
  ('select id,description,to_char(updatedate,\'DD/MM/YYYY HH24:MI\') as updatedate,sessions_tasks_id, case when iscanceled = true then \'Annulée\' when iscanceled = false then \'En cours\' else \'Inconnu\' end as iscanceled from availabilities where id = $1',[req.params.id],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows[0]);
  })
}

function addNewAvailabilities(req, res, next) {
  if (new Date(req.body.sessions_tasks.start_date) > new Date(req.body.sessions_tasks.end_date)) {
    return res.status(400).send("Veuillez entrer des dates valides.")
  }
  pool.query('insert into tasks (name) values ($1) returning id',[req.body.tasks.name],(err,rows) =>  {
    if (err) throw err;
    let tasks_id = rows.rows[0].id;

    pool.query('insert into sessions_tasks (isfromadmin,description,amountofpeople,start_date,end_date,tasks_id,sessions_id) values ($1,$2,$3,$4,$5,$6,$7) returning id',[req.body.sessions_tasks.isfromadmin,req.body.sessions_tasks.description,req.body.sessions_tasks.amountofpeople,req.body.sessions_tasks.start_date, req.body.sessions_tasks.end_date,tasks_id, req.body.sessions_tasks.sessions_id],(err,rows) =>  {
      if (err) throw err;
      let sessions_tasks_id = rows.rows[0].id

      pool.query('insert into availabilities (description,iscanceled,users_id,sessions_tasks_id) values ($1,$2,$3,$4)',
      [req.body.availabilities.description,req.body.availabilities.iscanceled,req.body.availabilities.users_id, sessions_tasks_id],(err,rows) =>  {
        if (err) throw err;
        return res.send({data : true});
      });
    })
  });
}

function addAvailabilities(req, res, next) {
  pool.query('insert into availabilities (description,iscanceled,users_id,sessions_tasks_id) values ($1,$2,$3,$4)',[req.body.description,req.body.iscanceled,req.body.users_id, req.body.sessions_tasks_id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  });
}

function cancelAvailabilities(req, res, next) {
  pool.query('update availabilities set iscanceled=true, updatedate = now() where id = ($1)',[req.body.id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

function updateAvailabilities(req, res, next) {
  pool.query('update availabilities set description=$1, updatedate = now() where id = ($2)',[req.body.description,req.body.id],(err,rows) =>  {
    if (err) throw err;
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