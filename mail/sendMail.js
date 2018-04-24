//const mjmlUtils = require("mjml-utils");
const transporter = require("./transporterGmail");
const path = require("path");
const pathToHtmlEmailTemplate = path.join(
  __dirname,
  "./mail_templates/welcome_mail.html"
);

const sendAwesomeMail = (to, confirmationCode, from = "fiestit@gmail.com") => {
  // return mjmlUtils
  //   .inject(pathToHtmlEmailTemplate, variables)
  //   .then(finalTemplate => {
  //     console.log("FINAL TEMPLATE");
  //     console.log(finalTemplate);

  return transporter
    .sendMail({
      from: `"Welcome" <${from}>`,
      to,
      subject: "🎉 Confirmar registro en Fiestit 🎉", // Asunto
      text: `http://localhost:3000/auth/confirm/${confirmationCode}`
    })
    .then(info => console.log(info));
};

module.exports = sendEmail;