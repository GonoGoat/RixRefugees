require('dotenv').config()

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
module.exports = pool;
