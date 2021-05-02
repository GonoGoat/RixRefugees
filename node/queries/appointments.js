var pool = require('../db.js')

// add query functions
function getAllAppointments(req, res, next) {
  pool.query
  ('select appointments.id, appointments.status_id, friends_id, status.name as status_name, concat(friends.lname, \' \', friends.fname) as friends_name,'
  + ' appointments.iscanceled, to_char(appointment,\'YYYY-MM-DD\') as appointment'
  + ' from appointments join status on appointments.status_id = status.id join friends on appointments.friends_id = friends.id' 
  ,(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getAvailableSessionsTasks(req, res, next) {
  pool.query((
    'select sessions_tasks.id,amountofpeople, tasks.id as tasks_id,tasks.name,sessions_tasks.description,sessions_id,' +
    ' concat(to_char(sessions_tasks.start_date,\'YYYY-MM-DD\'),\'T\',to_char(sessions_tasks.start_date, \'HH24:MI\')) as start_date,' +
    ' concat(to_char(sessions_tasks.end_date,\'YYYY-MM-DD\'),\'T\',to_char(sessions_tasks.end_date, \'HH24:MI\')) as end_date' +
    ' from sessions_tasks join tasks on tasks.id = sessions_tasks.tasks_id join sessions on sessions.id = sessions_tasks.sessions_id' +
    ' where sessions.end_date >= now() and isfromadmin is true')
  ,(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getSessionsTasksInfo(req, res, next) {
  pool.query((
    'select sessions_tasks.id, tasks.id as tasks_id,tasks.name,sessions_tasks.description,sessions_id, concat(users.lname, \' \', users.fname) as username,' +
    ' to_char(sessions_tasks.start_date,\'DD/MM/YYYY HH24:MI\') as start_date, to_char(sessions_tasks.end_date,\'DD/MM/YYYY HH24:MI\') as end_date' +
    ' from sessions_tasks join tasks on tasks.id = sessions_tasks.tasks_id join sessions on sessions.id = sessions_tasks.sessions_id join users on sessions.users_id = users.id' +
    ' where sessions_tasks.id = $1'),[parseInt(req.params.id)]
  ,(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows[0]);
  })
}

function getSessionsTasksPerSessions(req, res, next) {
  pool.query
  ('select sessions_tasks.id, isfromadmin, amountofpeople, sessions_id, tasks.id as tasks_id,tasks.name,' +
   ' concat(to_char(start_date,\'YYYY-MM-DD\'),\'T\',to_char(start_date, \'HH24:MI\')) as start_date,' +
   ' concat(to_char(end_date,\'YYYY-MM-DD\'),\'T\',to_char(end_date, \'HH24:MI\')) as end_date '+
   ' from sessions_tasks join tasks on tasks.id = sessions_tasks.tasks_id' +
   ' where sessions_id = $1',[parseInt(req.params.id)]
  ,(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getAppointmentsDesc(req, res, next) {
  pool.query('select id, description from appointments id where id = $1'
  ,[parseInt(req.params.id)],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows[0]);
  })
}

function addSessionsTasks(req, res, next) {
  pool.query('insert into sessions_tasks (isfromadmin,description,amountofpeople,start_date,end_date,tasks_id,sessions_id) values ($1,$2,$3,$4,$5,$6,$7) returning id'
  ,[req.body.isfromadmin,req.body.description,req.body.amountofpeople,req.body.start_date,req.body.end_date,req.body.tasks_id, req.body.sessions_id],(err,rows) =>  {
    if (err) throw err;
    return res.send({
      success : true,
      data : rows.rows[0].id
    });
  })
}

function deleteSessionsTasks(req, res, next) {
  let e = req.body;
  e.map((obj) => {
    pool.query('delete from sessions_tasks where id = ($1)',[obj],(err,rows) =>  {
      if (err) throw err;
    })
  });
  return res.send({data : true});
}

function updateSessionsTasks(req, res, next) {
  console.log(req.body);
  pool.query('update sessions_tasks set isfromadmin = $1, description = $2, amountofpeople = $3, start_date = $4, end_date = $5, tasks_id = $6, sessions_id = $7 where id = $8'
  ,[Boolean(req.body.isfromadmin),req.body.description,req.body.amountofpeople,req.body.start_date,req.body.end_date,req.body.tasks_id, req.body.sessions_id, req.body.id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
  getAllAppointments: getAllAppointments,
  getAvailableSessionsTasks : getAvailableSessionsTasks,
  getAppointmentsDesc : getAppointmentsDesc,
  getSessionsTasksInfo : getSessionsTasksInfo,
  getSessionsTasksPerSessions : getSessionsTasksPerSessions,
  addSessionsTasks : addSessionsTasks,
  deleteSessionsTasks : deleteSessionsTasks,
  updateSessionsTasks : updateSessionsTasks
};