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
  pool.query('insert into places (name,address,description) values ($1,$2,$3)',[req.body.name,req.body.address,req.body.description],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

function deletePlaces(req, res, next) {
  let e = req.body;
  e.map((obj) => {
    pool.query('delete from places where id = ($1)',[obj],(err,rows) =>  {
      if (err) throw err;
      return res.send({data : true});
    })
  });
}

function updatePlaces(req, res, next) {
  pool.query('update places set name=$1, address = $2, description = $3 where id = $4',[req.body.name,req.body.address,req.body.description,req.body.id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
  getAllPlaces: getAllPlaces,
  getPlacesInfo : getPlacesInfo,
  addPlaces : addPlaces,
  deletePlaces : deletePlaces,
  updatePlaces : updatePlaces
};