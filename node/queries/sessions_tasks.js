var pool = require('../db.js')

// add query functions
function getAllSessionsTasks(req, res, next) {
  pool.query
  ('select sessions_tasks.id, isfromadmin, concat(to_char(start_date,\'YYYY-MM-DD\'),\'T\',to_char(start_date, \'HH24:MI\')) as start_date,concat(to_char(end_date,\'YYYY-MM-DD\'),\'T\',to_char(end_date, \'HH24:MI\')) as end_date,amountofpeople, tasks.id,tasks.name, sessions_id from sessions_tasks join tasks on tasks.id = sessions_tasks.tasks_id' 
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

function addSessions(req, res, next) {
  pool.query('insert into sessions (start_date,end_date,users_id,places_availabilities_id) values ($1,$2,$3,$4)',[req.body.start_date,req.body.end_date,req.body.users_id, req.body.places_availabilities_id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
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
  getAllSessionsTasks: getAllSessionsTasks,
  getSessionsInfo : getSessionsInfo,
  addSessions : addSessions,
  deleteSessions : deleteSessions,
  updateSessions : updateSessions
};