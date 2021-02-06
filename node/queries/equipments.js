var pool = require('../db.js')

// add query functions
function getAllEquipments(req, res, next) {
  pool.query('select * from equipments',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

module.exports = {
  getAllEquipments: getAllEquipments,
};