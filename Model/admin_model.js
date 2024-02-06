const mongoose= require('mongoose')

let admin_model = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isDeleted : {
        type : Boolean,
        required : true
    },
    admin_jwt : {
        type : String
    }
})

module.exports = mongoose.model('admin',admin_model)