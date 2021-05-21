var pool = require('../db.js');
var format = require('pg-format');

// add query functions
function getAllFriends(req, res, next) {
  pool.query('select id, fname, lname, to_char(in_date,\'YYYY-MM-DD\') as in_date,to_char(out_date,\'YYYY-MM-DD\') as out_date from friends ',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getFriendsInfo(req, res, next) {
  pool.query('select friends.id as id, fname, lname, nationality, notes, phone, status_id, to_char(birth_date,\'YYYY-MM-DD\') as birth_date, to_char(in_date,\'YYYY-MM-DD\') as in_date,to_char(out_date,\'YYYY-MM-DD\') as out_date from friends join status on status.id = friends.status_id where friends.id = $1',[req.params.id],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows[0]);
  })
}

function getValidFriendsAssignmentPerSessionsTasks(req, res, next) {
  pool.query('select id, concat(lname, \' \', fname) as username, isFriendAssigned($1,id) as isassigned from friends where out_date is null',[req.params.id],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function getFriendsDisplayInfo(req, res, next) {
  pool.query(('select friends.id as id, fname, lname, nationality, notes, phone, status.id as status_id, status.name, extract (YEAR from age(current_date,birth_date)) as age, to_char(in_date,\'DD/MM/YYYY\') as in_date,to_char(out_date,\'DD/MM/YYYY\') as out_date  from friends join status on friends.status_id = status.id where friends.id = $1'),[parseInt(req.params.id)],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows[0]);
  })
}

function addFriends(req, res, next) {
  let query = [req.body.lname,req.body.fname,req.body.in_date,req.body.birth_date,req.body.phone,req.body.status_id,req.body.nationality,req.body.notes]
  pool.query(format('insert into friends (lname,fname,in_date,birth_date,phone,status_id,nationality,notes) values (%L)',query),(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

function deleteFriends(req, res, next) {
  pool.query(format('delete from friends where id in (%L)',req.body),(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  }) 
}

function updateFriends(req, res, next) {
  pool.query('update friends set fname = $1,lname = $2,nationality = $3,notes = $4, phone = $5, status_id = $6, birth_date = $7, in_date = $8, out_date = $9 where id = $10',
  [req.body.fname,req.body.lname,req.body.nationality,req.body.notes,req.body.phones,req.body.status_id,req.body.birth_date,req.body.in_date,req.body.out_date,req.body.id],
  (err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

module.exports = {
    getAllFriends: getAllFriends,
    getValidFriendsAssignmentPerSessionsTasks : getValidFriendsAssignmentPerSessionsTasks,
    getFriendsInfo : getFriendsInfo,
    getFriendsDisplayInfo : getFriendsDisplayInfo,
    addFriends : addFriends,
    deleteFriends : deleteFriends,
    updateFriends : updateFriends
};