function auth(req,res,isadmin) {
    if (req.session.user && (req.session.user.isadmin === isadmin || req.session.user.isadmin === true)) return true
    return res.status(400).send("Vous n'avez pas les permissions nécessaires pour accéder à cette fonctionnalité");
}

module.exports = auth;