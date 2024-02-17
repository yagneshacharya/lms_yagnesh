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
    default : false
  },
});


module.exports = mongoose.model("Admin_Model", admin_registration);


