var pool = require('../db.js');

function getAllAdminUsers(req, res, next) {
    pool.query
    ('select id, concat(lname, \' \', fname) as username from users where isAdmin = true'
    ,(err,rows) =>  {
      if (err) throw err;
      return res.send(rows.rows);
    })
}

function getUnavailableAdminUsersPerSessionsTasks(req, res, next) {
  pool.query
  ('select id, concat(lname, \' \', fname) as username from users where isAdmin = true and hasavailabilities($1,id) = false',
  [req.params.id],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

async function addUsers(req, res, next) {
  pool.query ('insert into users (password,fname,lname,mail,isadmin,isactive,lastActivity,contact) values ($1,$2,$3,$4,$5,$6,$7,$8) returning id',
  [req.body.password,req.body.fname,req.body.lname,req.body.mail,req.body.isadmin,true, new Date(),req.body.contact], (err,rows) =>  {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    id = rows.rows[0].id

    pool.query ('insert into registrations (motivation,users_id) values ($1,$2)',
    [req.body.motivation,id], (err,rows) =>  {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      return res.send(true)
    })
  })
}

module.exports = {
    getAllAdminUsers: getAllAdminUsers,
    getUnavailableAdminUsersPerSessionsTasks : getUnavailableAdminUsersPerSessionsTasks,
    addUsers : addUsers
  };