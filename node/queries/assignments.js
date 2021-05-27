var pool = require('../db.js');
var format = require('pg-format');
var moment = require("moment");

// add query functions
function getAssignmentsPerUser(req, res, next) {
  pool.query("select distinct on (sessions_tasks.id) sessions_tasks_id as sessions_tasks_id ,assignments.id as id, availabilities.id as availabilities_id, users.id as users_id, assignments.feedback, tasks.name, sessions_tasks.amountofpeople, to_char(sessions_tasks.start_date,'DD/MM/YYYY HH24:MI') as start_date, to_char(sessions_tasks.end_date,'DD/MM/YYYY HH24:MI') as end_date, (select count(*) from assignments as assign where availabilities_id = assignments.availabilities_id) as assignedFriends from assignments join availabilities on assignments.availabilities_id = availabilities.id join users on availabilities.users_id = users.id join sessions_tasks on availabilities.sessions_tasks_id = sessions_tasks.id join tasks on sessions_tasks.tasks_id = tasks.id where users_id = $1 and sessions_tasks.end_date > now()", [req.params.id],(err,rows) =>  {
    if (err) throw err;
    return res.send(rows.rows);
  })
}

function addAdminAssignments(req, res, next) {
  let query = req.body.admin.map(element => {
    let dateTime = `Généré automatiquement par ajout administrateur. Fait le ${moment().format("DD-MM-YYYY HH:mm")}`;
    return [dateTime,false,element.id,req.body.sessions_tasks];
  });
  pool.query(format('insert into availabilities (description,iscanceled,users_id,sessions_tasks_id) values %L returning id',query),(err,rows) =>  {
    if (err) throw err;

    let queryTwo = [];
    rows.rows.forEach((obj, i) => {
      req.body.admin[i].friends.forEach((val,j) => {
        queryTwo.push([rows.rows[i].id,req.body.admin[i].friends[j]])
      })
    });
    pool.query(format('insert into assignments (availabilities_id,friends_id) values %L',queryTwo),(err,rows) =>  {
      if (err) throw err;
      return res.send({data : true});
    })
  })
}

function addUsersAssignments(req, res, next) {
  let query = [];
  req.body.forEach((obj) => {
    obj.friends.forEach((val) => {
      query.push([obj.id,val])
    })
  });
  pool.query(format('insert into assignments (availabilities_id,friends_id) values %L',query),(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  });
}

function deleteAssignmentsPerFriends(req, res, next) {
  pool.query(format('delete from assignments where availabilities_id in (%L) and friends_id in (%L)',req.body.users, req.body.friends),(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  })
}

function deleteAssignmentsPerUsers(req, res, next) {
  pool.query(format('delete from assignments where availabilities_id in (%L)',req.body),(err,rows) =>  {
    if (err) throw err;
    return res.send({data : true});
  });
}

module.exports = {
    getAssignmentsPerUser: getAssignmentsPerUser,
    addAdminAssignments : addAdminAssignments,
    addUsersAssignments : addUsersAssignments,
    deleteAssignmentsPerFriends : deleteAssignmentsPerFriends,
    deleteAssignmentsPerUsers : deleteAssignmentsPerUsers
};