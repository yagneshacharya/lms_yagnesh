const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

let course_registration = mongoose.Schema({
  course_name: {
    type: String,
  },
  course_title: {
    type: String,
  },
  course_duration: {
    type: String,
  },
  course_isDeleted: {
    type: Boolean,
    default: false,
  },
  company_id : {
     type : mongoose.Schema.Types.ObjectId,
     ref : 'company_db',
     required : true
  }
});

module.exports = mongoose.model("Course_Model", course_registration);
