var pool = require('../db.js');

// add query functions
function getAllPresentsFriends(req, res, next) {
  pool.query('select id, fname, lname, to_char(in_date,\'DD/MM/YYYY\') as in_date from friends where out_date is null ',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getValidFriendsAssignmentPerSessionsTasks(req, res, next) {
    pool.query('select id, concat(lname, \' \', fname) as username, isFriendAssigned($1,id) as isassigned from friends where out_date is null',
    [req.params.id],(err,rows) =>  {
      if (err) throw err;
      return res.send(rows.rows);
    })
}

function getFriendsInfo(req, res, next) {
  pool.query((
    'select friends.id as friends_id, fname, lname, nationality, notes, phone, status.id as status_id, status.name, extract (YEAR from age(current_date,birth_date)) as age,' +
    ' to_char(in_date,\'DD/MM/YYYY\') as in_date from friends join status on friends.status_id = status.id where friends.id = $1')
  ,[parseInt(req.params.id)],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows[0]);
  })
}

function addPlacesAvail(req, res, next) {
  pool.query('insert into places_availabilities (start_avail,end_avail,bed_quantity,places_id) values ($1,$2,$3,$4)',
  [req.body.start_avail,req.body.end_avail,req.body.bed_quantity,req.body.places_id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

function deletePlacesAvail(req, res, next) {
  let e = req.body;
  e.map((obj) => {
    pool.query('delete from places_availabilities where id = ($1)',[obj],(err,rows) =>  {
      if (err) throw err;
    })
  });
  return res.send({data : true});
}

function updatePlacesAvail(req, res, next) {
  pool.query('update places_availabilities set start_avail = $1,end_avail = $2,bed_quantity = $3,places_id = $4 where id = $5',
  [req.body.start_avail,req.body.end_avail,req.body.bed_quantity,req.body.places_id,req.body.id],(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
    getAllPresentsFriends: getAllPresentsFriends,
    getValidFriendsAssignmentPerSessionsTasks : getValidFriendsAssignmentPerSessionsTasks,
    getFriendsInfo : getFriendsInfo,
    addPlacesAvail : addPlacesAvail,
    deletePlacesAvail : deletePlacesAvail,
    updatePlacesAvail : updatePlacesAvail
};