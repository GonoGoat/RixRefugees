var pool = require('../db.js')
const errors = require('../errors.js');
const check = require('../validators.js');
const cypher = require("../cypher");
const auth = require('../auth');

// add query functions
function getAllDonations(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  pool.query('select id,fname,lname, to_char(date,\'DD/MM/YYYY HH24:MI\') as date, isresolved from donations',(err,rows) =>  {
    if (err) return errors(res,err);
    let donations = rows.rows.map(obj => {
        return {
            id : obj.id,
            fname : cypher.decodeString(obj.fname),
            lname : cypher.decodeString(obj.lname),
            date : obj.date,
            isresolved : obj.isresolved
        }
    })
    return res.send(donations);
  })
}

function getDonations(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let verif = check.checkForm(res,[
    check.validFk(req.params.id)
  ])
  if (verif !== true) {
      return verif;
  }

  pool.query('select id,contact,description,isresolved from donations where id = $1',[parseInt(req.params.id)],(err,rows) =>  {
    if (err) return errors(res,err);
    let donation = rows.rows[0]
    donation.contact = cypher.decodeString(donation.contact)
    donation.description = cypher.decodeString(donation.description)
    return res.send(donation);
  })
  }

function addDonations(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["fname","lname","description","contact"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.limitedString(req.body.fname,true,20),
    check.limitedString(req.body.lname,true,20),
    check.notNull(req.body.description)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query('insert into donations (fname,lname,description,contact,isresolved) values ($1,$2,$3,$4,$5)',[cypher.encodeString(req.body.fname),cypher.encodeString(req.body.lname),cypher.encodeString(req.body.description),cypher.encodeString(req.body.contact),false],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`Merci pour votre donations ! Nous vous recontacterons bientôt afin d'organiser la récupératio de votre don.`);
  })
}

function updateDonations(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["isresolved","id"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.id),
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query('update donations set isresolved = $1 where id = $2',[Boolean(req.body.isresolved),req.body.id],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(`La tâche a bien été modifiée.`);
  })
}

module.exports = {
  getAllDonations: getAllDonations,
  getDonations : getDonations,
  addDonations : addDonations,
  updateDonations : updateDonations
};