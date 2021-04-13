var pool = require('../db.js');

function getAllAdminUsers(req, res, next) {
    pool.query
    ('select id, concat(lname, \' \', fname) as username from users where isAdmin = true'
    ,(err,rows) =>  {
      if (err) throw err;
      return res.send(rows.rows);
    })
}

module.exports = {
    getAllAdminUsers: getAllAdminUsers,
  };