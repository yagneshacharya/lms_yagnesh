const mongoose= require('mongoose');

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
    }
  });


 


module.exports = mongoose.model('company_db',company_registration)

