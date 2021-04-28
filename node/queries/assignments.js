var pool = require('../db.js');
var format = require('pg-format');
var moment = require("moment");

// add query functions
async function getAssignmentsPerUser(req, res, next) {
  await pool.query("select distinct on (sessions_tasks.id) sessions_tasks_id as sess_tasks_id ,assignments.id as id, availabilities.id as availabilities_id, sessions_tasks.id sessions_tasks_id, users.id as users_id,"
  + " assignments.feedback, tasks.name, sessions_tasks.amountofpeople,"
  + " to_char(sessions_tasks.start_date,'DD/MM/YYYY HH24:MI') as start_date,"
  + " to_char(sessions_tasks.end_date,'DD/MM/YYYY HH24:MI') as end_date,"
  + " (select count(*) from assignments as assign where availabilities_id = assignments.availabilities_id) as assignedFriends"
  + " from assignments"
  + " join availabilities on assignments.availabilities_id = availabilities.id join users on availabilities.users_id = users.id"
  +" join sessions_tasks on availabilities.sessions_tasks_id = sessions_tasks.id join tasks on sessions_tasks.tasks_id = tasks.id"
  +" where users_id = $1 and sessions_tasks.end_date > now()", [req.params.id])
  .then(result => res.send(result.rows))
  .catch(e => {console.log(e)});
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
    .then(res.send({data : true}));
}

async function addUsersAssignments(req, res, next) {
  let query = [];
  req.body.forEach((obj) => {
    obj.friends.forEach((val) => {
      query.push([obj.id,val])
    })
  });
  await pool.query(format('insert into assignments (availabilities_id,friends_id) values %L',query))
    .then(res.send({data : true}));
}

async function deleteAssignmentsPerFriends(req, res, next) {
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
    getAssignmentsPerUser: getAssignmentsPerUser,
    addAdminAssignments : addAdminAssignments,
    addUsersAssignments : addUsersAssignments,
    deleteAssignmentsPerFriends : deleteAssignmentsPerFriends
};