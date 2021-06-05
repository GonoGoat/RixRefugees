var pool = require('../db.js');
var argon = require('argon2');
const crypto = require('crypto');
const cypher = require('../cypher');
const errors = require('../errors.js');
const check = require('../validators.js');
const transporter = require('../mail.js');

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

async function getCurrentUser(req, res, next) {
  if (req.session.user) {
    pool.query ("update users set lastactivity = current_date where id = $1",[req.session.user.id], (err,rows) =>  {
      if (err) return errors(res,err);
      return res.send({loggedIn : true, isadmin : req.session.user.isadmin})
    })
  }
  else {
    return res.send({loggedIn : false})
  }
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
      pool.query ('insert into users (password,fname,lname,mail,isadmin,isactive,lastActivity,contact,token) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id',
      [hash,cypher.encodeString(req.body.fname),cypher.encodeString(req.body.lname),cypher.encodeString(req.body.mail.toLowerCase()),false,true, new Date(),cypher.encodeString(req.body.contact),"Account created"], (err,rows) =>  {
        if (err) return errors(res,err);
        id = rows.rows[0].id

        pool.query ('insert into registrations (motivation,users_id) values ($1,$2)',
        [req.body.motivation,id], (err,rows) =>  {
          if (err) return errors(res,err);
          return res.send("Votre candidature a bien été enregistrée par le système et sera traitée très prochainement par les coordinateurs de l'association.\nNous vous contacterons par email pour vous informer de notre décision.")
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

  pool.query ('select id,password,isadmin from users where mail = $1 and isactive = true',
  [cypher.encodeString(req.body.mail.toLowerCase())], async (err,rows) => {
    if (err) return errors(res,err);
    if (rows.rows.length > 0) {
      if (await argon.verify(rows.rows[0].password, req.body.password)) {
        let user = {id : rows.rows[0].id, isadmin : rows.rows[0].isadmin}
        req.session.user = user
        return res.send(user.isadmin)
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

/**
 * @author https://www.youtube.com/watch?v=NOuiitBbAcU&list=PLB97yPrFwo5g0FQr4rqImKa55F_aPiQWk&index=48
 */
function resetPassword(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["mail"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.mail(req.body.mail),
  ])

  crypto.randomBytes(32,(err,buffer) => {
    if (err) return res.status(500).send("Erreur lors de la procédure de réinitialisation de mot de passe. Veuillez réessayer.")
    const token = buffer.toString('hex');
    pool.query("select id from users where mail = $1",[cypher.encodeString(req.body.mail.toLowerCase())], (err,rows) => {
      if (err) return errors(res,err);
      if (rows.rows.length > 0) {
        // Code from https://attacomsian.com/blog/javascript-date-add-days
        const date = new Date();
        date.setDate(date.getDate() + 1);
        //--------------
        pool.query("update users set token = $1, expireToken = $2 where id = $3",[token,date, rows.rows[0].id,], (err,rows) => {
          if (err) return errors(res,err);
          transporter.sendMail({
            to : req.body.mail,
            from : process.env.MAIL_USER,
            subject : "RixRefugees : Réinitialisation de mot de passe",
            html :  `<p>Vous avez émis une demande de réinitialisation de mot de passe</p>
              <h5>Cliquer sur <a href="${process.env.WEBSITE}/reset/${token}"> ce lien</a> pour changer de mot de passe.`
          },(err,info) => {
            if (err) return res.status(500).send("Une erreur s'est produite lors de l'envoi du mail. Veuillez réessayer.")
            return res.send("La procédure de réinitialisation de mot de passe a bien été lancée.\nVérifiez votre boîte mail pour continuer (regardez aussi dans le courrier indésirable !)");
          })
        })
      }
      else {
        return res.status(404).send("Utilisateur introuvable. Veuillez rentrer l'adresse email avec laquelle vous avez créé votre compte.")
      }
    })
  })
}

async function newPassword(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["password","token"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.password(req.body.password),
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query ('select id from users where token = $1 and expiretoken >= now()',
  [req.body.token], async (err,rows) => {
    if (err) return errors(res,err);
    if (rows.rows.length > 0) {
      let hash = await argon.hash(req.body.password, {type: argon.argon2id});
      // Code from https://attacomsian.com/blog/javascript-date-add-days
      const date = new Date();
      date.setDate(date.getDate() - 1);
      //--------------
      pool.query ('update users set password = $1, expireToken = $2  where id = $3',
      [hash,date,rows.rows[0].id], (err,rows) =>  {
        if (err) return errors(res,err);
        return res.send("Votre mot de passe a bien été réinitialisé !");
      })
    }
    else {
      return res.status(400).send("Jeton invalide ou expiré. Veuillez réessayer.")
    }
  })
}


function logout(req, res, next) {
  if (req.session.user) {
    res.clearCookie("userId");
    return res.send("Vous avez bien été déconnecté !");
  }
  else {
    return res.status(500).send("Vous n'avez pas pu être déconnecté.")
  }
}

function getUserInformation(req, res, next) {
  pool.query('select fname, lname, mail, isadmin, contact from users where id = $1',
  [req.session.user.id], (err, rows) => {
    if (err) return errors(res,err);
    if (rows.rows.length > 0) {
      let user = rows.rows[0];
      user.fname = cypher.decodeString(user.fname);
      user.lname = cypher.decodeString(user.lname);
      user.mail = cypher.decodeString(user.mail);
      user.contact = cypher.decodeString(user.contact);
      user.isadmin = user.isadmin ? "Coordinateur" : "Bénévole";
      return res.send(user);
    }
    else {
      return res.status(403).send("Utilisateur invalide. Veuillez vous déconnecter.")
    }
  })
}

function getUserInformationToChange(req, res, next) {
  pool.query('select fname, lname, contact from users where id = $1',
  [req.session.user.id], (err, rows) => {
    if (err) return errors(res,err);
    if (rows.rows.length > 0) {
      let user = rows.rows[0];
      user.fname = cypher.decodeString(user.fname);
      user.lname = cypher.decodeString(user.lname);
      user.contact = cypher.decodeString(user.contact);
      return res.send(user);
    }
    else {
      return res.status(403).send("Utilisateur invalide. Veuillez vous déconnecter.")
    }
  })
}

async function updateUser(req, res, next) {
  let body = check.checkForm(res,[check.hasProperties(["user,password"],req.body)])
  if (body !== true) {
    return body;
  }

  body = check.checkForm(res,[check.hasProperties(["fname","lname","contact"],req.body.user)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.password(req.body.password),
    check.limitedString(req.body.user.fname,true,20),
    check.limitedString(req.body.user.lname,true,20),
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query ('select password from users where id = $1',
  [req.session.user.id], async (err,rows) => {
    if (err) return errors(res,err);
    if (rows.rows.length > 0) {
      if (await argon.verify(rows.rows[0].password, req.body.password)) {
        pool.query ('update users set fname = $1, lname = $2, contact = $3 where id = $4',[cypher.encodeString(req.body.user.fname),cypher.encodeString(req.body.user.lname),cypher.encodeString(req.body.user.contact),req.session.user.id], (err,rows) =>  {
          if (err) return errors(res,err);
          return res.send("Vos données personnelles ont bien été modifiées.")
        })
      }
      else {
        return res.status(404).send("Mot de passe invalide. Veuillez réessayer.")
      }
    }
    else {
      return res.status(403).send("Utilisateur invalide. Veuillez vous déconnecter.")
    }
  });
}

module.exports = {
    getAllAdminUsers: getAllAdminUsers,
    getUnavailableAdminUsersPerSessionsTasks : getUnavailableAdminUsersPerSessionsTasks,
    addUsers : addUsers,
    getUserInformation: getUserInformation,
    login : login,
    logout : logout,
    getCurrentUser : getCurrentUser,
    resetPassword : resetPassword,
    newPassword : newPassword,
    getUserInformationToChange : getUserInformationToChange,
    updateUser : updateUser
  };