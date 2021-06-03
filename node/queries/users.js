var pool = require('../db.js');
var argon = require('argon2');
const cypher = require('../cypher');
const errors = require('../errors.js');
const check = require('../validators.js');

function getAllAdminUsers(req, res, next) {
  pool.query('select id, concat(lname, \' \', fname) as username from users where isAdmin = true'
  ,(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

function getUnavailableAdminUsersPerSessionsTasks(req, res, next) {
  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query('select id, concat(lname, \' \', fname) as username from users where isAdmin = true and hasavailabilities($1,id) = false',
  [parseInt(req.params.id)],(err,rows) =>  {
    if (err) return errors(res,err);
    return res.send(rows.rows);
  })
}

async function addUsers(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["mail","password","fname","lname","contact","motivation"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.mail(req.body.mail),
    check.password(req.body.password),
    check.limitedString(req.body.fname,true,20),
    check.limitedString(req.body.lname,true,20),
    check.notNull(req.body.motivation)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query ('select * from users where mail = $1',
  [cypher.encodeString(req.body.mail.toLowerCase())], async (err,rows) => {
    if (err) return errors(res,err);
    if (rows.rows.length > 0) {
      return res.status(400).send("Adresse email déjà utilisée. Veuillez en utiliser une autre")
    }
    else {
      let hash = await argon.hash(req.body.password, {type: argon.argon2id});
      pool.query ('insert into users (password,fname,lname,mail,isadmin,isactive,lastActivity,contact) values ($1,$2,$3,$4,$5,$6,$7,$8) returning id',
      [hash,cypher.encodeString(req.body.fname),cypher.encodeString(req.body.lname),cypher.encodeString(req.body.mail.toLowerCase()),false,true, new Date(),cypher.encodeString(req.body.contact)], (err,rows) =>  {
        if (err) return errors(res,err);
        id = rows.rows[0].id

        pool.query ('insert into registrations (motivation,users_id) values ($1,$2)',
        [req.body.motivation,id], (err,rows) =>  {
          if (err) return errors(res,err);
          return res.send(true)
        })
      })
    }
  })
}

function login(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["mail","password"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.mail(req.body.mail),
    check.password(req.body.password)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query ('select * from users where mail = $1',
  [cypher.encodeString(req.body.mail.toLowerCase())], async (err,rows) => {
    if (err) return errors(res,err);
    if (rows.rows.length > 0) {
      if (await argon.verify(rows.rows[0].password, req.body.password)) {
        return res.send(rows.rows[0].isadmin)
      }
      else {
        return res.status(404).send("Mot de passe invalide. Veuillez réessayer.")
      }
    }
    else {
      return res.status(404).send("Utilisateur introuvable. Veuillez rentrer l'adresse email avec laquelle vous avez créé votre compte.")
    }
  })
}

function getUserWithID(req, res, next) {
  let verif = check.checkForm(res,[check.validFk(req.params.id)])
  if (verif !== true) {
    return verif;
  }

  pool.query('select fname, lname, mail, isadmin, contact from users where id = $1',
  [parseInt(req.params.id)], (err, rows) => {
    if (err) return errors(res,err);
    if (rows.rows.length > 0) {
      let user = rows.rows[0];
      user.fname = cypher.decodeString(user.fname);
      user.lname = cypher.decodeString(user.lname);
      user.mail = cypher.decodeString(user.mail);
      user.contact = cypher.decodeString(user.contact);
      return res.send(user);
    }
    else {
      return res.status(403).send("Invalid user id")
    }
  })
}



module.exports = {
    getAllAdminUsers: getAllAdminUsers,
    getUnavailableAdminUsersPerSessionsTasks : getUnavailableAdminUsersPerSessionsTasks,
    addUsers : addUsers,
    getUserWithID: getUserWithID,
    login : login
  };