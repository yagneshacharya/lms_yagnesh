const mongoose = require("mongoose");

let admin_registration = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
});

let company_registration = mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  company_password: {
    type: String,
    required: true,
  },
  company_email: {
    type: String,
    required: true,
  },
  company_logo: {
    type: String,
    required: true,
  },
  company_contact_number: {
    type: Number,
    required: true,
  },
  company_address: {
    type: String,
    required: true,
  },
  company_isDeleted: {
    type: Boolean,
    required: true,
  },
  course_name: {
    type: String
  },
  course_title: {
    type: String
  },
  course_duration: {
    type: String
  },
  course_isDeleted: {
    type: Boolean,
    default: false,
  },
});

const admin_model = mongoose.model("admin", admin_registration);
const company_model = mongoose.model("company", company_registration);

module.exports = { admin_model, company_model };
