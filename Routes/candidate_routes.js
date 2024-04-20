const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");

const { candidate_login,
    candidate_forgot_password,
    candidate_update_password} = require("../Controllers/candidate_controllers");

router.post("/candidate_login",candidate_login);
router.post("/candidate_forgot_password",candidate_forgot_password);
router.post("/candidate_update_password",candidate_update_password);


module.exports = router;



