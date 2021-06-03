var pool = require('../db.js')
const format = require('pg-format');
const errors = require('../errors.js');
const check = require('../validators.js');

// add query functions
function getAllSessions(req, res, next) {
  pool.query('select sessions.id,to_char(start_date,\'YYYY-MM-DD\') as start_date,to_char(end_date,\'YYYY-MM-DD\') as end_date,users_id, concat(users.lname, \' \', users.fname) as username, places.id as placesId,places.name,places_availabilities_id from sessions join places_availabilities on places_availabilities.id = sessions.places_availabilities_id join users on sessions.users_id = users.id join places on places_availabilities.places_id = places.id order by sessions.id desc'
  ,(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function getAvailableSessions(req, res, next) {
  pool.query('select sessions.id,to_char(start_date,\'YYYY-MM-DD\') as start_date,to_char(end_date,\'YYYY-MM-DD\') as end_date,users_id, concat(users.lname, \' \', users.fname) as username, places.id as placesId,places.name,places_availabilities_id from sessions join places_availabilities on places_availabilities.id = sessions.places_availabilities_id join users on sessions.users_id = users.id join places on places_availabilities.places_id = places.id where end_date >= now() order by sessions.id desc'
  ,(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function getSessionsInfo(req, res, next) {
  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query('select sessions.id as id, to_char(pla.start_avail,\'DD/MM/YYYY HH24:MI\') as start_avail, to_char(pla.end_avail,\'DD/MM/YYYY HH24:MI\') as end_avail, places.address, places.description, users.mail  from sessions join users on sessions.users_id = users.id join places_availabilities as pla on pla.id = sessions.places_availabilities_id join places on places.id = pla.places_id where sessions.id = $1'
  ,[parseInt(req.params.id)],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows[0]);
  })
}

function addSessions(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["start_date","end_date","users_id","places_availabilities"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.places_availabilities_id),
    check.validFk(req.body.users_id),
    check.validDates(req.body.start_date,req.body.end_date)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query('select id,to_char(start_avail,\'YYYY-MM-DD\') as start_avail,to_char(end_avail,\'YYYY-MM-DD\') as end_avail from places_availabilities where id = $1',[req.body.places_availabilities_id]
  ,(err,rows) =>  {
    if (err) return errors(res,err);
    if ((new Date(rows.rows[0].start_avail) > new Date(req.body.start_date)) || (new Date(rows.rows[0].end_avail) < new Date(req.body.end_date))) return res.status(405).send("Veuillez sélectionner des dates à l'intérieur de la période de disponibilité du lieu d'hébergement.")
    
    pool.query('insert into sessions (start_date,end_date,users_id,places_availabilities_id) values ($1,$2,$3,$4)',[req.body.start_date,req.body.end_date,req.body.users_id, req.body.places_availabilities_id],(err,rows) =>  {
      if (err) return errors(res,err);
      return res.send({data : true});
    })
  })
}

function deleteSessions(req, res, next) {
  let verif = check.checkForm(res,[
    check.arrayOfValidFk(req.body)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query(format('delete from sessions where id = (%L)',req.body),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send({data : true});
  })
}

function updateSessions(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["start_date","end_date","users_id","places_availabilities","id"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.places_availabilities_id),
    check.validFk(req.body.users_id),
    check.validDates(req.body.start_date,req.body.end_date)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query('select id,to_char(start_avail,\'YYYY-MM-DD\') as start_avail,to_char(end_avail,\'YYYY-MM-DD\') as end_avail from places_availabilities where id = $1',[req.body.places_availabilities_id]
  ,(err,rows) =>  {
    if (err) return errors(res,err);
    if ((new Date(rows.rows[0].start_avail) > new Date(req.body.start_date)) || (new Date(rows.rows[0].end_avail) < new Date(req.body.end_date))) return res.status(405).send("Veuillez sélectionner des dates à l'intérieur de la période de disponibilité du lieu d'hébergement.")
    
    pool.query('update sessions set start_date=$1, end_date = $2, users_id = $3, places_availabilities_id = $4 where id = $5',[req.body.start_date,req.body.end_date,req.body.users_id, req.body.places_availabilities_id, req.body.id],(err,rows) =>  {
      if (err) return errors(res,err);
      return res.send({data : true});
    })
  })
}

module.exports = {
  getAllSessions: getAllSessions,
  getSessionsInfo : getSessionsInfo,
  getAvailableSessions : getAvailableSessions,
  addSessions : addSessions,
  deleteSessions : deleteSessions,
  updateSessions : updateSessions
};