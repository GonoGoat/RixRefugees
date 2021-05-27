const pool = require('../db.js');
const format = require('pg-format');
const errors = require('../errors.js');
const check = require('../validators.js');

// add query functions
function getAllAppointments(req, res, next) {
  pool.query('select appointments.id, appointments.status_id, friends_id, status.name as status_name, concat(friends.lname, \' \', friends.fname) as friends_name, appointments.iscanceled, to_char(appointment,\'YYYY-MM-DD\') as appointment from appointments join status on appointments.status_id = status.id join friends on appointments.friends_id = friends.id' 
  ,(err,rows) =>  {
    if (err) return errors(res,err)
    return res.send(rows.rows);
  })
}

function getAppointmentsDesc(req, res, next) {
  pool.query('select id, description, case when iscanceled = true then \'Oui\' when iscanceled = false then \'Non\' else \'Inconnu\' end as iscanceled from appointments id where id = $1'
  ,[parseInt(req.params.id)],(err,rows) =>  {
    if (err) return errors(res,err)
    return res.send(rows.rows[0]);
  })
}

function addAppointments(req, res, next) {
  if (check.checkForm([
    toString(req.body.description),
  ]))
  pool.query('insert into appointments (appointment,description,iscanceled, status_id, friends_id) values ($1,$2,$3,$4,$5)'
  ,[req.body.appointment,req.body.description,req.body.iscanceled,req.body.status_id,req.body.friends_id],(err,rows) =>  {
    if (err) return errors(res,err)
    return res.send({data : true});
  })
}

function deleteAppointments(req, res, next) {
  pool.query(format('delete from appointments where id in (%L)',req.body),(err,rows) =>  {
    if (err) return errors(res,err)
    return res.send({data : true});
  }) 
}

function updateAppointments(req, res, next) {
  pool.query('update appointments set appointment = $1, description = $2, iscanceled = $3, status_id = $4, friends_id = $5 where id = $6'
  ,[req.body.appointment,req.body.description,Boolean(req.body.iscanceled),req.body.status_id,req.body.friends_id, req.body.id],(err,rows) =>  {
    if (err) return errors(res,err)
    return res.send({data : true});
  })
}

module.exports = {
  getAllAppointments: getAllAppointments,
  getAppointmentsDesc : getAppointmentsDesc,
  addAppointments : addAppointments,
  deleteAppointments : deleteAppointments,
  updateAppointments : updateAppointments
};