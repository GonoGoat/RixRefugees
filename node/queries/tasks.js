var pool = require('../db.js')

// add query functions
function getAllTasks(req, res, next) {
  pool.query('select * from tasks',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function addTasks(req, res, next) {
  pool.query('insert into tasks (name) values ($1)',[req.body.name],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

function deleteTasks(req, res, next) {
  let e = req.body;
  e.map((obj) => {
    pool.query('delete from tasks where id = ($1)',[obj],(err,rows) =>  {
      if (err) throw err;
    })
  });
  return res.send({data : true});
}

function updateTasks(req, res, next) {
  pool.query('update tasks set name = $1 where id = $2',[req.body.name,req.body.id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
  getAllTasks: getAllTasks,
  addTasks : addTasks,
  deleteTasks : deleteTasks,
  updateTasks : updateTasks
};