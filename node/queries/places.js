var pool = require('../db.js')

// add query functions
function getAllPlaces(req, res, next) {
  pool.query('select id,name from places',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getPlacesInfo(req, res, next) {
  pool.query('select id, address, description from places where id = $1',[parseInt(req.params.id)],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows[0]);
  })
}

function addPlaces(req, res, next) {
  console.log(req.body)
  pool.query('insert into places (name,address,description) values ($1,$2,$3)',[req.body.name,req.body.address,req.body.description],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
  getAllPlaces: getAllPlaces,
  getPlacesInfo : getPlacesInfo,
  addPlaces : addPlaces
};