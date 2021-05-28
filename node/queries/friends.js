var pool = require('../db.js');
var format = require('pg-format');
const cypher = require('../cypher');

// add query functions
function getAllFriends(req, res, next) {
  pool.query('select id, fname, lname, to_char(in_date,\'YYYY-MM-DD\') as in_date,to_char(out_date,\'YYYY-MM-DD\') as out_date from friends ',(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows.map(obj => {
      return {
        id : obj.id,
        fname : cypher.decodeString(obj.fname),
        lname : cypher.decodeString(obj.lname),
        in_date : obj.in_date,
        out_date : obj.out_date
      }
    }));
  })
}

function getFriendsInfo(req, res, next) {
  pool.query('select friends.id as id, fname, lname, nationality, notes, phone, status_id, to_char(birth_date,\'YYYY-MM-DD\') as birth_date, to_char(in_date,\'YYYY-MM-DD\') as in_date,to_char(out_date,\'YYYY-MM-DD\') as out_date from friends join status on status.id = friends.status_id where friends.id = $1',[req.params.id],(err,rows) =>  {
    if (err) throw err;
    let obj = rows.rows[0];
    return res.send({
      id : obj.id,
      fname : cypher.decodeString(obj.fname),
      lname : cypher.decodeString(obj.lname),
      nationality : cypher.decodeString(obj.nationality),
      notes : cypher.decodeString(obj.notes),
      phone : cypher.decodeString(obj.phone),
      status_id : obj.status_id,
      in_date : obj.in_date,
      out_date : obj.out_date,
      birth_date : obj.birth_date,

    });
  })
}

function getValidFriendsAssignmentPerSessionsTasks(req, res, next) {
  pool.query('select id, lname, fname, isFriendAssigned($1,id) as isassigned from friends where out_date is null',[req.params.id],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows.map(obj => {
      return {
        id : obj.id,
        username : `${cypher.decodeString(obj.lname)} ${cypher.decodeString(obj.fname)}`,
        isassigned : obj.isassigned
      }
    }));
  })
}

function getFriendsDisplayInfo(req, res, next) {
  pool.query(('select friends.id as id, fname, lname, nationality, notes, phone, status.id as status_id, status.name, extract (YEAR from age(current_date,birth_date)) as age, to_char(in_date,\'DD/MM/YYYY\') as in_date,to_char(out_date,\'DD/MM/YYYY\') as out_date  from friends join status on friends.status_id = status.id where friends.id = $1'),[parseInt(req.params.id)],(err,rows) =>  {
    if (err) throw err;
    let obj = rows.rows[0];
    return res.send({
      id : obj.id,
      fname : cypher.decodeString(obj.fname),
      lname : cypher.decodeString(obj.lname),
      nationality : cypher.decodeString(obj.nationality),
      notes : cypher.decodeString(obj.notes),
      phone : cypher.decodeString(obj.phone),
      status_id : obj.status_id,
      in_date : obj.in_date,
      out_date : obj.out_date,
      age : obj.age,
      name : cypher.decodeString(obj.name),
    });
  });
}

function addFriends(req, res, next) {
  let query = [cypher.encodeString(req.body.lname),cypher.encodeString(req.body.fname),req.body.in_date,req.body.birth_date,cypher.encodeString(req.body.phone),req.body.status_id,cypher.encodeString(req.body.nationality),cypher.encodeString(req.body.notes)]
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
  [cypher.encodeString(req.body.fname),cypher.encodeString(req.body.lname),cypher.encodeString(req.body.nationality),cypher.encodeString(req.body.notes),cypher.encodeString(req.body.phones),req.body.status_id,req.body.birth_date,req.body.in_date,req.body.out_date,req.body.id],
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