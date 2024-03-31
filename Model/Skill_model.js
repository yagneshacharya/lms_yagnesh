const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

let Skill_registration = mongoose.Schema({
  Skill_name: {
    type: String,
  },
  Skill_Description: {
    type: String,
  },
  Sub_skills:{
    type : Array
  },
  Skill_isDeleted: {
    type: Boolean,
    default: false,
  },
  company_id : {
     type : mongoose.Schema.Types.ObjectId,
     ref : 'company_db',
     required : true
  }
});

module.exports = mongoose.model("Skill_Model", Skill_registration);
