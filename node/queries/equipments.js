var pool = require('../db.js')

// add query functions
function getAllEquipments(req, res, next) {
  pool.query('select * from equipments',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function addEquipments(req, res, next) {
  pool.query('insert into equipments (name) values ($1)',[req.body.name],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

function deleteEquipments(req, res, next) {
  let e = req.body;
  e.map((obj) => {
    pool.query('delete from equipments where id = ($1)',[obj],(err,rows) =>  {
      if (err) throw err;
      return res.send({data : true});
    })
  });
}

function updateEquipments(req, res, next) {
  pool.query('update equipments set name = $1 where id = $2',[req.body.name,req.body.id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
  getAllEquipments: getAllEquipments,
  addEquipments : addEquipments,
  deleteEquipments : deleteEquipments,
  updateEquipments : updateEquipments
};