const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'fiestit@gmail.com',
      pass: '1234Fiestit' 
    }
});

module.exports = transporter;