var pool = require('../db.js')

// add query functions
function getAllSessions(req, res, next) {
  pool.query
  ('select sessions.id,to_char(start_date,\'YYYY-MM-DD\') as start_date,to_char(end_date,\'YYYY-MM-DD\') as end_date,users_id, concat(users.fname, \' \', users.lname) as username, places.id as placesId,places.name,places_availabilities_id from sessions join places_availabilities on places_availabilities.id = sessions.places_availabilities_id join users on sessions.users_id = users.id join places on places_availabilities.places_id = places.id order by sessions.id desc'
  ,(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getAvailabilitiesPerUser(req, res, next) {
  pool.query
  ('select id,description,iscanceled,users_id,sessions_tasks_id,to_char(updatedate,\'DD/MM/YYYY HH24:MI\') as updatedate from availabilities where users_id = $1',[req.params.id]
  ,(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getAvailabilitiesInfo(req, res, next) {
  pool.query
  ('select id,description,to_char(updatedate,\'DD/MM/YYYY HH24:MI\') as updatedate,sessions_tasks_id,'+
  ' case when iscanceled = true then \'Annulée\' when iscanceled = false then \'En cours\' else \'Inconnu\' end as iscanceled' +
  ' from availabilities where id = $1',[req.params.id]
  ,(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows[0]);
  })
}

function addNewAvailabilities(req, res, next) {

  console.log(req.body);
  pool.query('insert into tasks (name) values ($1) returning id',[req.body.tasks.name],(err,rows) =>  {
    if (err) throw err;
    let tasks_id = rows.rows[0].id;

    pool.query('insert into sessions_tasks (isfromadmin,description,amountofpeople,start_date,end_date,tasks_id,sessions_id) values ($1,$2,$3,$4,$5,$6,$7) returning id'
    ,[req.body.sessions_tasks.isfromadmin,req.body.sessions_tasks.description,req.body.sessions_tasks.amountofpeople,
    req.body.sessions_tasks.start_date, req.body.sessions_tasks.end_date,tasks_id, req.body.sessions_tasks.sessions_id],(err,rows) =>  {
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
  pool.query('insert into availabilities (description,iscanceled,users_id,sessions_tasks_id) values ($1,$2,$3,$4)',
  [req.body.description,req.body.iscanceled,req.body.users_id, req.body.sessions_tasks_id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  });
}

function cancelAvailabilities(req, res, next) {
  pool.query('update availabilities set iscanceled=true, updatedate = now() where id = ($1)',[req.body.id],(err,rows) =>  {
    if (err) throw err;
  })
  return res.send({data : true});
}

function updateAvailabilities(req, res, next) {
  pool.query('update availabilities set description=$1, updatedate = now() where id = ($2)',[req.body.description,req.body.id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
  getAllSessions: getAllSessions,
  getAvailabilitiesInfo : getAvailabilitiesInfo,
  getAvailabilitiesPerUser : getAvailabilitiesPerUser,
  addAvailabilities : addAvailabilities,
  addNewAvailabilities : addNewAvailabilities,
  updateAvailabilities : updateAvailabilities,
  cancelAvailabilities : cancelAvailabilities
};