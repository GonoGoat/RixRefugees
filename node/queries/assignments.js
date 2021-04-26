var pool = require('../db.js');
var format = require('pg-format');
var moment = require("moment");

// add query functions
async function getAssignmentsPerUser(req, res, next) {
  await pool.query('insert into registrations(users_ud) values ($1)', [10]).catch(e => {console.log(e)});
  return res.send('ok')
}

async function addAdminAssignments(req, res, next) {
  let query = req.body.admin.map(element => {
    let dateTime = `Généré automatiquement par ajout administrateur. Fait le ${moment().format("DD-MM-YYYY HH:mm")}`;
    return [dateTime,false,element.id,req.body.sessions_tasks];
  });
  let rows = (await pool.query(format('insert into availabilities (description,iscanceled,users_id,sessions_tasks_id) values %L returning id',query)).catch(err => {throw err})).rows;
  let queryTwo = [];
  rows.forEach((obj, i) => {
    req.body.admin[i].friends.forEach((val,j) => {
      queryTwo.push([rows[i].id,req.body.admin[i].friends[j]])
    })
  });
  pool.query(format('insert into assignments (availabilities_id,friends_id) values %L',queryTwo))
    .then(result => res.send({data : true}));
}

async function addUsersAssignments(req, res, next) {
  let query = [];
  req.body.forEach((obj) => {
    obj.friends.forEach((val) => {
      query.push([obj.id,val])
    })
  });
  await pool.query(format('insert into assignments (availabilities_id,friends_id) values %L',query))
    .then(result => res.send({data : true}));
}

async function deleteAssignmentsPerFriends(req, res, next) {
  console.log(req.body)
  if ("users" in req.body) {
    await pool.query(format('delete from assignments where availabilities_id in (%L)',req.body.users));
  }
  if ('friends' in req.body) {
    await pool.query(format('delete from assignments where availabilities_id in (%L) and friends_id in (%L)'
    ,req.body.friends.users, req.body.friends.friends));
  }
  return res.send({data : true});
}

module.exports = {
    getAllAccomodations: getAllAccomodations,
    addAdminAssignments : addAdminAssignments,
    addUsersAssignments : addUsersAssignments,
    deleteAssignmentsPerFriends : deleteAssignmentsPerFriends
};