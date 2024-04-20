
const candidateSchema = require("../Model/Candidate_model");
const SkillSchema = require("../Model/Skill_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { transporter, mailOptions, sendMail } = require("../Nodemailer");


//@ Candidate login _______________

const candidate_login = (req, res) => {
  try {
    let candidate_email = req.body.candidate_email;

    candidateSchema
      .findOne({ $and: [{ candidate_email }, { candidate_isDeleted: false }] })
      .then((data) => {
        let verifier = bcrypt.compareSync(
          req.body.candidate_password,
          data.candidate_password
        );

        if (!verifier) {
          // checking password
          res.send({
            isSuccess: false,
            message: "wrong password",
          });
        } else if (verifier) {
          // generating token
          const token = jwt.sign(
            { candidate: data.candidate_email, role: "candidate" },
            process.env.KEY
          );

          res.send({
            isSuccess: true,
            message: "Sucessfull loggin",
            candidate_token: token,
            candidateID: data._id,
          });
        }
      })
      .catch((err) => {
        console.log("here is your err", err);
        res.send({
          isSuccess: false,
          message: "candidate not found",
          error: err,
        });
      });
  } catch (error) {
    res.send({
      isSuccess: false,
      message: error,
    });
  }
};


const candidate_forgot_password = async (req, res) => {
  try {
    const { candidate_email } = req.body;

    await candidateSchema
      .findOne({ candidate_email })
      .then(() => {
        sendMail(transporter, mailOptions(candidate_email));
        res.send({
          isSuccess: true,
          data: "mail has been sent by controller",
        });
      })
      .catch((error) => {
        res.send({
          isSuccess: false,
          data: error,
        });
      });
  } catch (error) {
    res.send({
      isSuccess: false,
      data: error,
    });
  }
};

const candidate_update_password = async (req, res) => {
  const new_password = await req.body.candidate_new_password;
  let updated_obj = {
    candidate_password: bcrypt.hashSync(new_password, 10),
  };
  await candidateSchema
    .updateOne({ candidate_email: req.body.candidate_email }, updated_obj)
    .then((data) => {
      res.send({
        isSuccess: true,
        message: "password has been changed sucessfully",
        email: req.body.candidate_email,
        pass: req.body.candidate_new_password
      });
    })
    .catch((err) => {
      res.send({
        isSuccess: false,
        message: "Something went wrong while password updation",
        error: err,
      });
    });
};


module.exports = {
  candidate_login,
  candidate_forgot_password,
  candidate_update_password
};
