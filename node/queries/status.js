var pool = require('../db.js')
var format = require('pg-format');

// add query functions
function getAllStatus(req, res, next) {
  pool.query('select * from status',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function addStatus(req, res, next) {
  pool.query('insert into status (name) values ($1)',[req.body.name],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

function deleteStatus(req, res, next) {
  pool.query(format('delete from status where id in (%L)',req.body),(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  }) 
}

function updateStatus(req, res, next) {
  pool.query('update status set name = $1 where id = $2',[req.body.name,req.body.id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
  getAllStatus: getAllStatus,
  addStatus : addStatus,
  deleteStatus : deleteStatus,
  updateStatus : updateStatus
};