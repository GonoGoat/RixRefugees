var pool = require('../db.js');
var format = require('pg-format');
var moment = require("moment");
const check = require('../validators.js');
const errors = require('../errors.js');

// add query functions
function getAssignmentsPerUser(req, res, next) {
  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query("select distinct on (sessions_tasks.id) sessions_tasks_id as sessions_tasks_id ,assignments.id as id, availabilities.id as availabilities_id, users.id as users_id, assignments.feedback, tasks.name, sessions_tasks.amountofpeople, to_char(sessions_tasks.start_date,'DD/MM/YYYY HH24:MI') as start_date, to_char(sessions_tasks.end_date,'DD/MM/YYYY HH24:MI') as end_date, (select count(*) from assignments as assign where availabilities_id = assignments.availabilities_id) as assignedFriends from assignments join availabilities on assignments.availabilities_id = availabilities.id join users on availabilities.users_id = users.id join sessions_tasks on availabilities.sessions_tasks_id = sessions_tasks.id join tasks on sessions_tasks.tasks_id = tasks.id where users_id = $1 and sessions_tasks.end_date > now()", [req.params.id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function addAdminAssignments(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["admin","sessions_tasks"],req.body)])
  if (body !== true) {
    return body;
  }

  body = check.checkForm(res,[check.hasProperties(["id","friends"],req.body.admin[0])])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.sessions_tasks),
    check.arrayOfValidFk(req.body.admin[0].friends),
    check.validFk(req.body.admin[0].id)
  ])
  if (verif !== true) {
    return verif;
  }

  let query = req.body.admin.map(element => {
    let dateTime = `Généré automatiquement par ajout administrateur. Fait le ${moment().format("DD-MM-YYYY HH:mm")}`;
    return [dateTime,false,element.id,req.body.sessions_tasks];
  });
  pool.query(format('insert into availabilities (description,iscanceled,users_id,sessions_tasks_id) values %L returning id',query),(err,rows) =>  {
    if (err) return errors(res,err);

    let queryTwo = [];
    rows.rows.forEach((obj, i) => {
      req.body.admin[i].friends.forEach((val,j) => {
        queryTwo.push([rows.rows[i].id,req.body.admin[i].friends[j]])
      })
    });
    pool.query(format('insert into assignments (availabilities_id,friends_id) values %L',queryTwo),(err,rows) =>  {
      if (err) return errors(res,err);
      return res.send(`${req.body.admin.length} coordinateur${req.body.admin.length > 1 ? "s ont bien été assignés" : " a bien été assigné"} à la tâche demandée.`);
    })
  })
}

function addUsersAssignments(req, res, next) {
  let verif = check.checkForm(res,[
    check.validFk(req.body[0].id),
    check.arrayOfValidFk(req.body[0].friends)
  ])
  if (verif !== true) {
    return verif;
  }

  let query = [];
  req.body.forEach((obj) => {
    obj.friends.forEach((val) => {
      query.push([obj.id,val])
    })
  });
  pool.query(format('insert into assignments (availabilities_id,friends_id) values %L',query),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`${req.body.admin.length} bénévole${req.body.admin.length > 1 ? "s ont bien été assignés" : " a bien été assigné"} à la tâche demandée.`);
  });
}

function deleteAssignmentsPerFriends(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["users","friends"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.arrayOfValidFk(req.body.friends),
    check.arrayOfValidFk(req.body.users)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query(format('delete from assignments where availabilities_id in (%L) and friends_id in (%L)',req.body.users, req.body.friends),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`L'ami demandé n'est plus assigné à la tâche souhaitée.`);
  })
}

function deleteAssignmentsPerUsers(req, res, next) {
  let verif = check.checkForm(res,[
    check.arrayOfValidFk(req.body)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query(format('delete from assignments where availabilities_id in (%L)',req.body),(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`Le bénévole demandé n'est plus assigné à la tâche souhaitée.`);
  });
}

module.exports = {
    getAssignmentsPerUser: getAssignmentsPerUser,
    addAdminAssignments : addAdminAssignments,
    addUsersAssignments : addUsersAssignments,
    deleteAssignmentsPerFriends : deleteAssignmentsPerFriends,
    deleteAssignmentsPerUsers : deleteAssignmentsPerUsers
};