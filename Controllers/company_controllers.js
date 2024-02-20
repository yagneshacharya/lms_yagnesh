const company_model = require("../Model/company_model");
const candidateSchema = require("../Model/Candidate_model");
const SkillSchema = require("../Model/Skill_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { transporter, mailOptions, sendMail } = require("../Nodemailer");
const {updateCompany} = require('../Controllers/admin_controllers');

//@ Company login _______________

const company_login = (req, res) => {
  try {
    let company_email = req.body.company_email;

    company_model
      .findOne({ company_email })
      .then((data) => {
        let verifier = bcrypt.compareSync(
          req.body.company_password,
          data.company_password
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
            { company: data.company_email, role: "company" },
            process.env.KEY
          );

          res.send({
            // sending token as a response
            message: "Sucessfull loggin",
            company_token: token,
          });
        }
      })
      .catch((err) => {
        console.log("here is your err", err);
        res.send({
          message: "company not found",
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

// Adding Candidates ___________________________

const addCandidates = (req, res) => {
  const candidate = new candidateSchema({
    candidate_name: req.body.candidate_name,
    candidate_password: bcrypt.hashSync(req.body.candidate_password, 10),
    candidate_email: req.body.candidate_email,
    candidate_contact_number: req.body.candidate_contact_number,
    candidate_address: req.body.candidate_address,
    candidate_profilePic: req.body.candidate_profilePic,
    company_id: req.body.company_id,
  });

  candidate
    .save()
    .then((data) => {
      res.send({
        isSuccess: true,
        message: "Candidate is added",
        datas: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        isSuccess: false,
        message: "Something went wrong",
        error: err,
      });
    });
};

// updating Candidates ___________________

const updateCandidates = (req, res) => {
  let obj = {};

  if (req.body.candidate_name) {
    obj.candidate_name = req.body.candidate_name;
  }
  if (req.body.candidate_email) {
    obj.candidate_email = req.body.candidate_email;
  }
  if (req.body.candidate_password) {
    obj.candidate_password = bcrypt.hashSync(req.body.candidate_password, 10);
  }
  if (req.body.candidate_profilePic) {
    obj.candidate_profilePic = req.body.candidate_profilePic;
  }
  if (req.body.candidate_address) {
    obj.candidate_address = req.body.candidate_address;
  }
  if (req.body.candidate_contact_number) {
    obj.candidate_contact_number = req.body.candidate_contact_number;
  }
  if (req.body.candidate_isDeleted) {
    obj.candidate_isDeleted = req.body.candidate_isDeleted;
  }

  candidateSchema
    .updateOne({ candidate_name: req.query.candidate_name }, obj)
    .then(() => {
      res.send({
        isSuccess: true,
        message: "candidate has been updated",
      });
    })
    .catch((err) => {
      res.send({
        isSuccess: false,
        message: "Something went wrong",
        error: err,
      });
    });
};

// Deleting candidates ___________________

const deleteCandidates = (req, res) => {
  candidateSchema
    .deleteOne({ candidate_name: req.query.candidate_name })
    .then((data) => {
      res.send({
        isSuccess: true,
        message: "Candidate has been deleted successfully",
      });
    })
    .catch((err) => {
      res.send({
        isSuccess: false,
        message: "Something went wrong while deletion",
      });
    });
};

// Find all candidates __________________

const getAllCandidates = (req, res) => {
  try {
    const company_id = req.query.company_id;
    candidateSchema
      .find({ company_id: company_id })
      .then((data) => {
        res.send({
          isSuccess: true,
          message: "List of cancidates",
          response: data,
        });
      })
      .catch((err) => {
        res.send({
          isSuccess: false,
          message: "Candidates not found",
          error: err,
        });
      });
  } catch (error) {
    res.send({
      isSuccess: false,
      data: error,
    });
  }
};

// find candidate by id

const getCandidateById = (req, res) => {
  try {
    const company_id = req.query.company_id;
    const name = req.query.candidate_name;
    candidateSchema
      .find({
        $and: [
          { company_id: company_id },
          { candidate_name: new RegExp(name) },
        ],
      })
      .then((data) => {
        res.send({
          isSuccess: true,
          message: "List of cancidates",
          response: data,
        });
      })
      .catch((err) => {
        res.send({
          isSuccess: false,
          message: "Candidates not found",
          error: err,
        });
      });
  } catch (error) {
    res.send({
      isSuccess: false,
      data: error,
    });
  }
};

const addSkill = async (req, res) => {
  try {
    let { Skill_name, Skill_title, Skill_duration, company_id } = req.body;

    let Skill = new SkillSchema({
      Skill_name,
      Skill_title,
      Skill_duration,
      company_id,
    });

    Skill.save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {
    res.send({
      isSuccess: false,
      data: error,
    });
  }
};

const getAllSkills = (req, res) => {
  try {
    SkillSchema.find({ company_id: req.body.company_id })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.send({
          isSuccess: false,
          data: err,
        });
      });
  } catch (error) {
    res.send({
      isSuccess: false,
      data: error,
    });
  }
};

const company_forgot_password = async (req, res) => {
  try {
    const { company_email } = req.body;

    await company_model
      .findOne({ company_email })
      .then(() => {
        sendMail(transporter, mailOptions(company_email));
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

const company_update_password = async (req, res) => {
  const new_password = await req.body.company_new_password;
  const id = await req.body.id;

  let updated_obj = {
    company_password: bcrypt.hashSync(new_password,10)
  };

  await company_model
    .updateOne({ company_id: id }, updated_obj)
    .then(() => {
      res.send({
        isSuccess: true,
        message: "password has been changed sucessfully",
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
// $2b$10$Dtofun9MWPZUa29MYrCmjO1iHta7TQgtUkpuvRs288Uczn14xD2ky
module.exports = {
  company_login,
  addCandidates,
  deleteCandidates,
  getAllCandidates,
  updateCandidates,
  addSkill,
  getAllSkills,
  getCandidateById,
  company_forgot_password,
  company_update_password,
  updateCompany
};
