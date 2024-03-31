const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");

const {
  company_login,
  addCandidates,
  deleteCandidates,
  getAllCandidates,
  updateCandidates,
  getCandidateById,
  company_forgot_password,
  updateCompany,
  deleteAllCandidates,
  company_update_password
} = require("../Controllers/company_controllers");

const {company_middleWare} = require('../Middlewares/company_middlewares');

router.post("/company_login", company_login);
router.post("/addCandidates",company_middleWare,addCandidates);
router.delete("/deleteCandidates", deleteCandidates);
router.get("/getAllCandidates", getAllCandidates);
router.post("/updateCandidates", updateCandidates);
router.get("/getCandidateById", getCandidateById);
router.post("/company_forgot_password", company_forgot_password);
router.post("/updateCompany",updateCompany);
router.post("/deleteAllCandidates", company_middleWare,deleteAllCandidates);
router.post("/company_update_password",company_update_password);

module.exports = router;


