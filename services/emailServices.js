const nodemailer = require("nodemailer");
 
const emailConfig = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "marina.erando@gmail.com",
        pass: "adak ynzj eefc arsw"
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: "marina.erando@gmail.com",
      to: to,
      subject: subject,
      html: html,
    };
 
    await emailConfig.sendMail(mailOptions);
  } catch (error) {
    console.log("ha fallado el envio", error.message);
  }
};
 
module.exports = { sendEmail };