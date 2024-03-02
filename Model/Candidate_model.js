const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
let candidate_registration = mongoose.Schema({
  _id: {
    type: String,
    default: () => nanoid(4),
  },
  candidate_name: {
    type: String,
    required: true,
  },
  candidate_password: {
    type: String,
    required: true,
  },
  candidate_email: {
    type: String,
    required: true,
  },
  candidate_profilePic: {
    type: String,
    required: true,
  },
  candidate_contact_number: {
    type: Number,
    required: true,
  },
  candidate_address: {
    type: String,
    required: true,
  },
  candidate_isDeleted: {
    type: Boolean,
    default: false,
  },
  company_id: {
    type: String,
    ref: "company_db",
  },
});

module.exports = mongoose.model("Candidate_Model", candidate_registration);
