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

function getSessionsInfo(req, res, next) {
  pool.query('select sessions.id as id, to_char(pla.start_avail,\'DD/MM/YYYY HH24:MI\') as start_avail, to_char(pla.end_avail,\'DD/MM/YYYY HH24:MI\') as end_avail, places.address, places.description, users.mail  from sessions join users on sessions.users_id = users.id join places_availabilities as pla on pla.id = sessions.places_availabilities_id join places on places.id = pla.places_id where sessions.id = $1'
  ,[parseInt(req.params.id)],(err,rows) =>  {
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

function deleteSessions(req, res, next) {
  let e = req.body;
  e.map((obj) => {
    pool.query('delete from sessions where id = ($1)',[obj],(err,rows) =>  {
      if (err) throw err;
    })
  });
  return res.send({data : true});
}

function updateSessions(req, res, next) {
  pool.query('update sessions set start_date=$1, end_date = $2, users_id = $3, places_availabilities_id = $4 where id = $5',[req.body.start_date,req.body.end_date,req.body.users_id, req.body.places_availabilities_id, req.body.id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
  getAllSessions: getAllSessions,
  getSessionsInfo : getSessionsInfo,
  getAvailabilitiesPerUser : getAvailabilitiesPerUser,
  addAvailabilities : addAvailabilities,
  addNewAvailabilities : addNewAvailabilities,
  deleteSessions : deleteSessions,
  updateSessions : updateSessions
};