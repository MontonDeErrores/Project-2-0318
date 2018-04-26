const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'fiestit@gmail.com',
      pass: '{$MAILPASS}' 
    }
});

module.exports = transporter;