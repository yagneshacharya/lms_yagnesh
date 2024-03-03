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
  addSkill,
  getAllSkills,
  getCandidateById,
  company_forgot_password,
  updateCompany,
  deleteAllCandidates
} = require("../Controllers/company_controllers");

const {company_middleWare} = require('../Middlewares/company_middlewares');

router.post("/company_login", company_login);
router.post("/addCandidates",company_middleWare,addCandidates);
router.delete("/deleteCandidates", deleteCandidates);
router.get("/getAllCandidates", getAllCandidates);
router.post("/updateCandidates", updateCandidates);
router.put("/addSkill", addSkill);
router.get("/getAllSkills", getAllSkills);
router.get("/getCandidateById", getCandidateById);
router.post("/company_forgot_password", company_forgot_password);
router.post("/updateCompany", company_middleWare,updateCompany);
router.post("/deleteAllCandidates", company_middleWare,deleteAllCandidates);

module.exports = router;


