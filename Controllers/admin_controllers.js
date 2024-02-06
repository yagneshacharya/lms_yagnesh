const admin_m = require('../Model/admin_model')
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Creating new ADMIN


const createAdmin = (req, res) => {
    const admin = new admin_m({
        username: req.body.username,
        password: req.body.password,
        isDeleted: req.body.isDeleted
    })
    admin.save().then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err)
    })
}

// Admin login _______________

const admin_login = (req, res) => {
    let ui_pass = req.body.password;
    admin_m.findOne({ username: req.body.username }).then((data) => {
        if (ui_pass !== data.password) {
            res.send({
                isSuccess: false,
                message: "wrong password"
            })
        } else {
            const token = jwt.sign({ admin: data.username, role: 'admin' }, process.env.KEY)
            const uobj = {
                admin_jwt: token
            }
            admin_m.updateOne({ username: req.body.username }, uobj).then((u_data) => {
                console.log(u_data);
            }).catch((err) => {
                console.log(err)
            })
            res.send({
                isSuccess: true,
                message: "You are logged in",
                rData: data
            })
        }
    }).catch((err) => {
        res.send({ error: err, message: "user not found" })
    })
}



module.exports = { createAdmin, admin_login }