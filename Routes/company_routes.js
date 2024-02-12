const express = require('express')
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {company_login} = require('../Controllers/company_controllers')

router.get('/company_login', company_login)

module.exports = router



