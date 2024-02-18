const company_model = require("../Model/company_model");
const { candidateSchema } = require("../Model/Candidate_model");
const courseSchema = require("../Model/Course_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//@ Company login _______________

const company_login = (req, res) => {
  let companyName = req.body.company_email;

  company_model
    .findOne({ company_email: companyName })
    .then((data) => {
      let verifier = bcrypt.compareSync(
        req.body.password,
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
    candidate_isDeleted: req.body.isDeleted,
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

  if (req.body.name) {
    obj.candidate_name = req.body.name;
  }
  if (req.body.email) {
    obj.candidate_email = req.body.email;
  }
  if (req.body.password) {
    obj.candidate_password = bcrypt.hashSync(req.body.password, 10);
  }
  if (req.body.profilePic) {
    obj.candidate_profilePic = req.body.profilePic;
  }
  if (req.body.address) {
    obj.candidate_address = req.body.address;
  }
  if (req.body.contact) {
    obj.candidate_contact_number = req.body.contact;
  }
  if (req.body.isDeleted) {
    obj.candidate_isDeleted = req.body.isDeleted;
  }

  candidateSchema
    .updateOne({ candidate_name: req.query.name }, obj)
    .then((data) => {
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
    .deleteOne({ candidate_name: req.query.name })
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
  const company_id = req.query.company_id;
  candidateSchema
    .find({ company_id: company_id })
    .populate("company_id")
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
};

// find candidate by id

const getCandidateById = (req, res) => {
  const company_id = req.query.company_id;
  const name = req.body.candidate_name;
  candidateSchema
    .find({
      $and: [{ company_id: company_id }, { candidate_name: new RegExp(name) }],
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
};

const addCourse = async (req, res) => {
  let { course_name, course_title, course_duration, company_id } = req.body;

  let course = new courseSchema({
    course_name,
    course_title,
    course_duration,
    company_id,
  });

  course
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

const getAllcourses = (req, res) => {
  courseSchema
    .find({ company_id: req.body.company_id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
};

module.exports = {
  company_login,
  addCandidates,
  deleteCandidates,
  getAllCandidates,
  updateCandidates,
  addCourse,
  getAllcourses,
  getCandidateById,
};
