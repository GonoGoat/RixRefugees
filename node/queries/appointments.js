const pool = require('../db.js');
const format = require('pg-format');
const errors = require('../errors.js');
const check = require('../validators.js');
const cypher = require('../cypher');

// add query functions
function getAllAppointments(req, res, next) {
  pool.query('select appointments.id, appointments.status_id, friends_id, status.name as status_name, friends.lname, friends.fname, appointments.iscanceled, to_char(appointment,\'YYYY-MM-DD\') as appointment from appointments join status on appointments.status_id = status.id join friends on appointments.friends_id = friends.id' 
  ,(err,rows) =>  {
    if (err) return errors(res,err)
    return res.send(rows.rows.map(obj => {
      return {
        id : obj.id,
        friends_id : obj.friends_id,
        status_id : obj.status_id,
        status_name : cypher.decodeString(obj.status_name),
        friends_name : `${cypher.decodeString(obj.lname)} ${cypher.decodeString(obj.fname)}`,
        iscanceled : obj.iscanceled,
        appointment : obj.appointment,
      }
    }));
  })
}

function getAppointmentsDesc(req, res, next) {
  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query('select id, description, case when iscanceled = true then \'Oui\' when iscanceled = false then \'Non\' else \'Inconnu\' end as iscanceled from appointments id where id = $1'
  ,[parseInt(req.params.id)],(err,rows) =>  {
    if (err) return errors(res,err)
    let obj = rows.rows[0];
    return res.send({
      id : obj.id,
      iscanceled : obj.iscanceled,
      description : cypher.decodeString(obj.description)
    });
  })
}

function addAppointments(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["appointment","description","iscanceled","status_id","friends_id"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[check.validFk(req.body.places),check.arrayOfValidFk(req.body.equipments)])
  if (verif !== true) {
    return verif;
  }
  pool.query('insert into appointments (appointment,description,iscanceled, status_id, friends_id) values ($1,$2,$3,$4,$5)'
  ,[req.body.appointment,cypher.encodeString(req.body.description),req.body.iscanceled,req.body.status_id,req.body.friends_id],(err,rows) =>  {
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
  ,[req.body.appointment,cypher.encodeString(req.body.description),Boolean(req.body.iscanceled),req.body.status_id,req.body.friends_id, req.body.id],(err,rows) =>  {
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