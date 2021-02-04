require('dotenv').config()
var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var db = pgp(process.env.DB_KEY);

// add query functions
function getAllPlaces(req, res, next) {
    db.any('select * from places')
      .then(function (data) {
        res.status(200)
          .json({
            status: true,
            data: data,
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

module.exports = {
  getAllPlaces: getAllPlaces,
};