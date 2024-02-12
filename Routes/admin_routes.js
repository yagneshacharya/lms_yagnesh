const express = require('express')
const router = express.Router();
const { createAdmin, admin_login, addCompany, deleteCompany, getAllcompanies, updateCompany } = require('../Controllers/admin_controllers');
require('dotenv').config();
const { admin_model } = require('../Model/admin_schema');
const jwt = require('jsonwebtoken');

router.use(async (req, res, next) => {
    let token = '';

    await admin_model.findOne({ username: 'shubh' }).then((data) => {
        token = data.admin_jwt
    }).catch((err) => {
        console.log(err);
    })

    let auth = jwt.verify(token, process.env.KEY)

    if (!auth) res.send({
        message: "invalid authorization"
    })

    try {
        if (auth) {
            if (auth.role == 'admin') {
                next();
            }else{
                res.send('You are not authorized')
            }
        }
    } catch (error) {
        res.send({
            message: 'you are not authorized',
            error : err
        })
    }
})

router.post('/', createAdmin)
router.get('/admin_login', admin_login)
router.post('/addCompany',addCompany)
router.delete('/deleteCompany',deleteCompany)
router.get('/getAllcompanies',getAllcompanies)
router.put('/updateCompany',updateCompany)

module.exports = router;

