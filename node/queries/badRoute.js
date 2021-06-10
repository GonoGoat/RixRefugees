function badRoute(req, res, next) {
    return res.status(405).send("Cette route n'existe pas");
}

module.exports = badRoute;