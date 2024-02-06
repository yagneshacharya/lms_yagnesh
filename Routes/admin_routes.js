const express = require('express')
const router = express.Router();
const {createAdmin,admin_login} = require('../Controllers/admin_controllers');

router.post('/',createAdmin)
router.get('/admin_login',admin_login)

module.exports = router;

