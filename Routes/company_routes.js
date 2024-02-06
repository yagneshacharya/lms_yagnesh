const express = require('express')
const router = express.Router()
const { addCompany, deleteCompany, getAllcompanies, updateCompany } = require('../Controllers/company_controllers')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const admin_m = require('../Model/admin_model')

router.use(async (req, res, next) => {
    let token = '';

    await admin_m.findOne({ username: 'shubh' }).then((data) => {
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
            if (auth.role == 'asdmin') {
                next();
            }else{
                res.send('You are not authorized')
            }
        }
    } catch (error) {
        res.send({
            message: 'you are not authorized'
        })
    }
})



router.post('/addCompany',addCompany)
router.delete('/deleteCompany',deleteCompany)
router.get('/getAllcompanies',getAllcompanies)
router.put('/updateCompany',updateCompany)

module.exports = router









