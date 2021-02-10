var pool = require('../db.js')

// add query functions
function getAllPlaces(req, res, next) {
  pool.query('select id,name from places',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getPlacesInfo(req, res, next) {
  pool.query('select id, address, description from places where id = $1',[req.params.id],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows[0]);
  })
}

module.exports = {
  getAllPlaces: getAllPlaces,
  getPlacesInfo : getPlacesInfo
};