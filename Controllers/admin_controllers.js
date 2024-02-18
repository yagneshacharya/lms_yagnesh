const company_model = require('../Model/company_model');
const admin_model = require("../Model/admin_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Creating new ADMIN
 
const createAdmin = (req, res) => {
  const admin = new admin_model({
    username: req.body.username,
    password: req.body.password,
  });
  admin
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

// Admin login _______________

const admin_login = (req, res) => {
  let ui_pass = req.body.admin_password;
  admin_model
    .findOne({ username: req.body.admin_username })
    .then((data) => {
      if (ui_pass !== data.password) {
        res.send({
          isSuccess: false,
          message: "wrong password",
        });
      } else {
        const token = jwt.sign(
          { admin: data.username, role: "admin" },
          process.env.KEY
        );

        res.send({
          isSuccess: true,
          message: "You are logged in",
          admin_token: token,
        });
      }
    })
    .catch((err) => {
      res.send({ error: err, message: "user not found" });
    });
};

// Adding companies ___________________________

const addCompany = (req, res) => {
  const company = new company_model({
    company_name: req.body.company_name,
    company_password: bcrypt.hashSync(req.body.company_password, 10),
    company_email: req.body.company_email,
    company_contact_number: req.body.company_contact_number,
    company_address: req.body.company_address,
    company_logo: req.body.company_logo,
    company_isDeleted: req.body.isDeleted,
  });

  company
    .save()
    .then((data) => {
      res.send({
        isSuccess: true,
        message: "Company is added",
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

// updating companies ___________________

const updateCompany = (req, res) => {
  let obj = {};

  if (req.body.name) {
    obj.company_name = req.body.name;
  }
  if (req.body.email) {
    obj.company_email = req.body.email;
  }
  if (req.body.password) {
    obj.company_password = bcrypt.hashSync(req.body.password, 10);
  }
  if (req.body.logo) {
    obj.company_logo = req.body.logo;
  }
  if (req.body.address) {
    obj.company_address = req.body.address;
  }
  if (req.body.contact) {
    obj.company_contact_number = req.body.contact;
  }
  if (req.body.isDeleted) {
    obj.company_isDeleted = req.body.isDeleted;
  }

  company_model
    .updateOne({ company_name: req.query.name }, obj)
    .then((data) => {
      res.send({
        isSuccess: true,
        message: "company has been updated",
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

// Deleting companies ___________________

const deleteCompany = (req, res) => {
  company_model
    .deleteOne({ company_name: req.query.name })
    .then((data) => {
      res.send({
        isSuccess: true,
        message: "Company has been deleted successfully",
      });
    })
    .catch((err) => {
      res.send({
        isSuccess: false,
        message: "Something went wrong while deletion",
      });
    });
};

// Find all companies __________________

const getAllcompanies = (req, res) => {
  const names = req.query.names;
  company_model
    .find({ company_name: new RegExp(names) })
    .then((data) => {
      res.send({
        isSuccess: true,
        message: "List of companies ",
        response: data,
      });
    })
    .catch((err) => {
      res.send({
        isSuccess: false,
        message: "Companies not found",
        error: err,
      });
    });
};

module.exports = {
  createAdmin,
  admin_login,
  addCompany,
  deleteCompany,
  getAllcompanies,
  updateCompany,
};
