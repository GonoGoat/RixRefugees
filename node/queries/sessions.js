var pool = require('../db.js')

// add query functions
function getAllSessions(req, res, next) {
  pool.query
  ('select sessions.id,to_char(start_date,\'YYYY-MM-DD\') as start_date,to_char(end_date,\'YYYY-MM-DD\') as end_date,users_id, concat(users.fname, \' \', users.lname) as username, places.id as places_id,places.name from sessions join places_availabilities on places_availabilities.id = sessions.places_availabilities_id join users on sessions.users_id = users.id join places on places_availabilities.places_id = places.id'
  ,(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getSessionsInfo(req, res, next) {
  pool.query('select id, address, description from places where id = $1',[parseInt(req.params.id)],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows[0]);
  })
}

function addSessions(req, res, next) {
  pool.query('insert into places (name,address,description) values ($1,$2,$3)',[req.body.name,req.body.address,req.body.description],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

function deleteSessions(req, res, next) {
  let e = req.body;
  e.map((obj) => {
    pool.query('delete from places where id = ($1)',[obj],(err,rows) =>  {
      if (err) throw err;
      return res.send({data : true});
    })
  });
}

function updateSessions(req, res, next) {
  pool.query('update places set name=$1, address = $2, description = $3 where id = $4',[req.body.name,req.body.address,req.body.description,req.body.id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
  getAllSessions: getAllSessions,
  getSessionsInfo : getSessionsInfo,
  addSessions : addSessions,
  deleteSessions : deleteSessions,
  updateSessions : updateSessions
};