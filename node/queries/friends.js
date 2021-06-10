var pool = require('../db.js');
var format = require('pg-format');
const cypher = require('../cypher');
const errors = require('../errors.js');
const check = require('../validators.js');
const auth = require('../auth');

// add query functions
function getAllFriends(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  pool.query('select id, fname, lname, to_char(in_date,\'YYYY-MM-DD\') as in_date,to_char(out_date,\'YYYY-MM-DD\') as out_date from friends ',(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows.map(obj => {
      return {
        ...obj,
        fname : cypher.decodeString(obj.fname),
        lname : cypher.decodeString(obj.lname),
      }
    }));
  })
}

function getFriendsInfo(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query('select friends.id as id, fname, lname, nationality, notes, phone, status_id, to_char(birth_date,\'YYYY-MM-DD\') as birth_date, to_char(in_date,\'YYYY-MM-DD\') as in_date,to_char(out_date,\'YYYY-MM-DD\') as out_date from friends join status on status.id = friends.status_id where friends.id = $1',[req.params.id],(err,rows) =>  {
    if (err) return errors(res,err);
    let obj = rows.rows[0];
    return res.send({
      ...obj,
      fname : cypher.decodeString(obj.fname),
      lname : cypher.decodeString(obj.lname),
      nationality : cypher.decodeString(obj.nationality),
      notes : cypher.decodeString(obj.notes),
      phone : cypher.decodeString(obj.phone),
    });
  })
}

function getValidFriendsAssignmentPerSessionsTasks(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query('select id, lname, fname, isFriendAssigned($1,id) as isassigned from friends where out_date is null',[req.params.id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows.map(obj => {
      return {
        ...obj,
        username : `${cypher.decodeString(obj.lname)} ${cypher.decodeString(obj.fname)}`,
      }
    }));
  })
}

function getFriendsDisplayInfo(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query(('select friends.id as id, fname, lname, nationality, notes, phone, status.id as status_id, status.name, extract (YEAR from age(current_date,birth_date)) as age, to_char(in_date,\'DD/MM/YYYY\') as in_date,to_char(out_date,\'DD/MM/YYYY\') as out_date  from friends join status on friends.status_id = status.id where friends.id = $1'),[parseInt(req.params.id)],(err,rows) =>  {
    if (err) return errors(res,err);
    let obj = rows.rows[0];
    return res.send({
      ...obj,
      fname : cypher.decodeString(obj.fname),
      lname : cypher.decodeString(obj.lname),
      nationality : cypher.decodeString(obj.nationality),
      notes : cypher.decodeString(obj.notes),
      phone : cypher.decodeString(obj.phone),
      name : cypher.decodeString(obj.name),
    });
  });
}

function addFriends(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["lname","fname","in_date","birth_date","phone","status_id","nationality","notes"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[check.validFk(req.body.status_id),check.limitedString(req.body.lname,false,20),check.limitedString(req.body.fname,false,20),check.phoneNumber(req.body.phone),check.limitedString(req.body.nationality,false,3)])
  if (verif !== true) {
    return verif;
  }

  let query = [cypher.encodeString(req.body.lname),cypher.encodeString(req.body.fname),req.body.in_date,req.body.birth_date,cypher.encodeString(req.body.phone),req.body.status_id,cypher.encodeString(req.body.nationality),cypher.encodeString(req.body.notes)]
  pool.query(format('insert into friends (lname,fname,in_date,birth_date,phone,status_id,nationality,notes) values (%L)',query),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`L'ami a bien été ajouté.`);
  })
}

function deleteFriends(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let verif = check.checkForm(res,[check.arrayOfValidFk(req.body)])
  if (verif !== true) {
    return verif;
  }

  pool.query(format('delete from friends where id in (%L)',req.body),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`${req.body.length} ami${req.body.length > 1 ? "s ont bien été supprimés" : " a bien été supprimé"}.`);
  }) 
}

function updateFriends(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["lname","fname","in_date","birth_date","phone","status_id","nationality","notes","id","out_date"],req.body)])
  if (body !== true) {
    return body;
  }

  if (new Date(req.body.in_date) > new Date(req.body.out_date)) return res.status(405).send("Veuillez sélectionner des dates valides d'arrivée et de départ.")

  let verif = check.checkForm(res,[
    check.validFk(req.body.status_id),
    check.limitedString(req.body.lname,false,20),
    check.limitedString(req.body.fname,false,20),
    check.phoneNumber(req.body.phone),
    check.limitedString(req.body.nationality,false,3),
    check.validFk(req.body.id)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query('update friends set fname = $1,lname = $2,nationality = $3,notes = $4, phone = $5, status_id = $6, birth_date = $7, in_date = $8, out_date = $9 where id = $10',
  [cypher.encodeString(req.body.fname),cypher.encodeString(req.body.lname),cypher.encodeString(req.body.nationality),cypher.encodeString(req.body.notes),cypher.encodeString(req.body.phones),req.body.status_id,req.body.birth_date,req.body.in_date,req.body.out_date,req.body.id],
  (err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`L'ami a bien été modifié.`);
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