var pool = require('../db.js');
var format = require('pg-format');
var moment = require("moment");

// add query functions
async function getAllAccomodations(req, res, next) {
  //await pool.query('insert into registrations(users_ud) values ($1)', [10]).catch(e => {console.log(e)});
  return res.send('ok')
}

async function addAdminAssignments(req, res, next) {
  let query = req.body.admin.map(element => {
    let dateTime = `Généré automatiquement par ajout administrateur. Fait le ${moment().format("DD-MM-YYYY HH:mm")}`;
    return [dateTime,false,element.id,req.body.sessions_tasks];
  });
  //const {rows} = await pool.query(format('insert into availabilities (description,iscanceled,users_id,sessions_tasks_id) values %L returning id',query)).catch(err => {throw err});
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

function deleteAllAccomodations(req, res, next) {
  pool.query('delete from accomodations where places_id = ($1)',[req.body.places_id],(err,rows) =>  {
    if (err) throw err;
  })
  return res.send({data : true});
}

module.exports = {
    getAllAccomodations: getAllAccomodations,
    addAdminAssignments : addAdminAssignments,
    deleteAllAccomodations : deleteAllAccomodations
};