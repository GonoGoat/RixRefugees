var pool = require('../db.js')
const errors = require('../errors.js');
const check = require('../validators.js');
const cypher = require('../cypher');
const auth = require('../auth');
const transporter = require('../mail.js');

// add query functions
function getAllRegistrations(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  pool.query('select registrations.id as id, users.fname, users.lname, users.mail, to_char(users.lastactivity,\'DD/MM/YYYY\') as lastactivity, users_id from registrations join users on registrations.users_id = users.id',(err,rows) =>  {
    if (err) return errors(res,err);
    let registrations = rows.rows.map(obj => {
        return {
          ...obj,
          lname : cypher.decodeString(obj.lname),
          fname : cypher.decodeString(obj.fname),
          mail : cypher.decodeString(obj.mail),
        }
    });
    return res.send(registrations);
  })
}

function getRegistrationsDetails(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  pool.query('select registrations.id as id, motivation, users_id, users.contact from registrations join users on registrations.users_id = users.id where registrations.id = $1',[req.params.id],(err,rows) =>  {
    if (err) return errors(res,err);
    let registrations = rows.rows[0];
    return res.send({
      ...registrations,
      motivation : cypher.decodeString(registrations.motivation),
      contact : cypher.decodeString(registrations.contact)
    });
  });
}

function accept(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["id"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.id)
  ])
  if (verif !== true) {
    return verif;
  }

  pool.query("select users.mail from registrations join users on registrations.users_id = users.id where registrations.id = $1",[req.body.id],(err,rows) =>  {
    if (err) return errors(res,err);
    transporter.sendMail({
      to : cypher.decodeString(rows.rows[0].mail),
      from : process.env.MAIL_USER,
      subject : "RixRefugees : Candidature en tant que bénévole",
      html :  `<p>Vous avez souhaité vous inscrire à notre plateforme <a href="${process.env.WEBSITE}">${process.env.WEBSITE}</a></p>
        <p>Par cet email, nous vous informons que <strong>votre candidature a été acceptée</strong>.</p>
        <p>Nous vous souhaitons donc la bienvenue chez RixRefugees ! Vous pouvez dès à présent vous connecter sur notre plateforme en <a href="${process.env.WEBSITE}/login">cliquant ici</a>.</p>`
    },(err,info) => {
      if (err) return res.status(500).send("Une erreur s'est produite lors de l'envoi du mail. Veuillez réessayer.")
      pool.query('update users set isactive = true where id in (select users_id from registrations where id = $1)',[req.body.id],(err,rows) =>  {
        if (err) return errors(res,err);
        pool.query('delete from registrations where id = $1',[req.body.id],(err,rows) =>  {
          if (err) return errors(res,err);
          return res.send(`La candidature a bien été acceptée !`);
        })
      })
    })
  })
}

function refuse(req, res, next) {
  let perm = auth(req,res,true)
  if (perm !== true) {
    return perm
  }

  let body = check.checkForm(res,[check.hasProperties(["id"],req.body)])
  if (body !== true) {
    return body;
  }

  let verif = check.checkForm(res,[
    check.validFk(req.body.id)
  ])
  if (verif !== true) {
    return verif;
  }
  pool.query("select users.mail from registrations join users on registrations.users_id = users.id where registrations.id = $1",[req.body.id],(err,rows) =>  {
    if (err) return errors(res,err);
    transporter.sendMail({
      to : cypher.decodeString(rows.rows[0].mail),
      from : process.env.MAIL_USER,
      subject : "RixRefugees : Candidature en tant que bénévole",
      html :  `<p>Vous avez souhaité vous inscrire à notre plateforme <a href="${process.env.WEBSITE}">${process.env.WEBSITE}</a></p>
        <p>Par cet email, nous vous informons que <strong>votre candidature a été refusée</strong>.</p>
        <p>Votre compte contenant vos données personnelles à été supprimé. Si vous souhaitez en parler avec un coordinateur, contactons nous via l'adresse email suivante : admin@rixref.be</p>`
    },(err,info) => {
      if (err) return res.status(500).send("Une erreur s'est produite lors de l'envoi du mail. Veuillez réessayer.")
      pool.query("delete from users where id in (select users_id from registrations where id = $1)",[req.body.id],(err,rows) =>  {
        if (err) return errors(res,err);
        return res.send("La candidature a bien été refusée.");
      })
    })
  })
}


module.exports = {
  getAllRegistrations: getAllRegistrations,
  getRegistrationsDetails : getRegistrationsDetails,
  accept : accept,
  refuse : refuse,
};