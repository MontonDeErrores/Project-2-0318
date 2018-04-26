require('dotenv').config();

const transporter = require("./transporterGmail");
const path = require("path");


const sendMail = (to, confirmationCode, from = "fiestit@gmail.com") => {

  return transporter
    .sendMail({
      from: `"Welcome" <${from}>`,
      to,
      subject: "🎉 Confirmar registro en Fiestit 🎉", // Asunto
      text: `http://localhost:3000/auth/confirm/${confirmationCode}`
    })
    .then(info => console.log(info));
};

module.exports = sendMail;