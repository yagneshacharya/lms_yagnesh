const company_model = require("../Model/company_model");
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
        message: "Company is added recently",
        datas: data,
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

// updating companies ___________________

const updateCompany = (req, res) => {
  let obj = {};

  if (req.body.company_name) {
    obj.company_name = req.body.company_name;
  }
  if (req.body.company_email) {
    obj.company_email = req.body.company_email;
  }
  if (req.body.company_password) {
    obj.company_password = bcrypt.hashSync(req.body.company_password, 10);
  }
  if (req.body.company_logo) {
    obj.company_logo = req.body.company_logo;
  }
  if (req.body.company_address) {
    obj.company_address = req.body.company_address;
  }
  if (req.body.company_contact_number) {
    obj.company_contact_number = req.body.company_contact_number;
  }
  if (req.body.isDeleted) {
    obj.company_isDeleted = req.body.isDeleted;
  }

  company_model
    .updateOne({ _id: req.body._id }, { ...obj })
    .then((data) => {
      console.log(req.headers.authorization.split(" ")[1]);
      res.send({
        isSuccess: true,
        response: data,
      });
    })
    .catch((err) => {
      res.send({
        isSuccess: false,
        message: "Something went wrong while updating",
        error: err,
      });
    });
};



//@ Find all companies by name__________________

const getAllcompanies = (req, res) => {
  try {
    const names = req.query.names;
    company_model
      .find({company_isDeleted : false})
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
  } catch (error) {
    res.send({
      isSuccess: false,
      data: error,
    });
  }
};

//@ Find all companies only

const getAllCompaniesOnly = (req, res) => {
  try {
    company_model
      .find({})
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
  } catch (error) {
    res.send({
      isSuccess: false,
      data: error,
    });
  }
};


// @Deleting companies __________________
const deleteCompany = (req, res) => {
  try {
    company_model
      .deleteOne({ _id: req.query.companyID})
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
  } catch (error) {
    res.send({
      isSuccess: false,
      data: error,
    });
  }
};
//@ Find  companies by id __________________
const getCompanyById = (req, res) => {
  try {
    const names = req.body.names;
    company_model
      .find({
        $and: [{ company_name: new RegExp(names) }, { _id: req.body.id }],
      })
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
  } catch (error) {
    res.send({
      isSuccess: false,
      data: error,
    });
  }
};

module.exports = {
  createAdmin,
  admin_login,
  addCompany,
  deleteCompany,
  getAllcompanies,
  updateCompany,
  getCompanyById,
  getAllCompaniesOnly,
};
