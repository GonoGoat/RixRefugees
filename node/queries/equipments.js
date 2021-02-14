var pool = require('../db.js')

// add query functions
function getAllEquipments(req, res, next) {
  pool.query('select * from equipments',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function addEquipments(req, res, next) {
  console.log(req.body);
  pool.query('insert into equipments (name) values ($1)',[req.body.name],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
  getAllEquipments: getAllEquipments,
  addEquipments : addEquipments
};