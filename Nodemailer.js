const nodemailer = require("nodemailer");
const fs = require("fs");

const htmlEmail = fs.readFileSync("mail_template.html", "utf-8");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "yagneshacharya11@gmail.com",
    pass: "qltbuwiwulnlioti", //@ go to google > security > app passwords and generate a new one
  },
});
const mailOptions = (mail_id) => {
  let link = `http://localhost:3000/PasswordReset/${mail_id}`;
  let htmlWithEmail = htmlEmail.replace("[ResetLink]", link);
  return {
    from: '"yagnesha charya 👻" <yagneshacharya11@gmail.com>',
    to: `${mail_id}`,
    subject: "Reset Your Password",
    text: "Click the link below to reset your password:",
    //  html: `<a href=${link}>Reset Password</a>`,
    html: htmlWithEmail,
  };
};

const sendMail = async (transporter, mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail has been sent:", info.response);
  } catch (error) {
    console.error("Error occurred while sending email:", error);
  }
};

module.exports = { transporter, mailOptions, sendMail };
