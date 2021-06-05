function errors(res,err) {
    return res.status(500).send("Requête incompréhensible. Veuillez réessayer ou entrer des valeurs valides et/ou existantes.");
}

module.exports = errors