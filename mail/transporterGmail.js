require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'fiestit@gmail.com',
      pass: process.env.$MAILPASS
    }
});

module.exports = transporter;