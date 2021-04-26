require('dotenv').config()
/*var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var db = pgp(process.env.DB_KEY);

module.exports = db;*/
const pg = require('pg');
let pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port:  process.env.DB_PORT
});

pool.connect(function (err) {
  if (err) throw err;
  else {
    console.log('Connection with database done.');
  }
});
/*
pool.on('error', (err, client) => {
  console.error('Error:', err);
});
*/
module.exports = pool;
