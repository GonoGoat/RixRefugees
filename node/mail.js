require('dotenv').config()
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
});

module.exports = transporter