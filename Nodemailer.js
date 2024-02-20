const nodemailer = require("nodemailer");

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

const mailOptions = (mail_id)=>{
 return  {
    from: '"yagnesha charya 👻" <yagneshacharya11@gmail.com>',
    to: `${mail_id}`,
    subject: "Hello nodemailer✔",
    text: "Hello Nodemaler is perfectly working?",
    html: "<b>You passed! the final testing</b>",
  };  
}

const sendMail = async (transporter, mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail has been sent:", info.response);
  } catch (error) {
    console.error("Error occurred while sending email:", error);
  }
};



module.exports = {transporter,mailOptions,sendMail}

