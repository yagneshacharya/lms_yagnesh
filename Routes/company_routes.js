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
  company_update_password,
  assignSkill
} = require("../Controllers/company_controllers");

const {company_middleWare} = require('../Middlewares/company_middlewares');

router.post("/company_login", company_login);
router.post("/addCandidates",addCandidates);
router.delete("/deleteCandidates", deleteCandidates);
router.get("/getAllCandidates", getAllCandidates);
router.post("/updateCandidates", updateCandidates);
router.get("/getCandidateById", getCandidateById);
router.post("/company_forgot_password", company_forgot_password);
router.post("/updateCompany",updateCompany);
router.post("/deleteAllCandidates", company_middleWare,deleteAllCandidates);
router.post("/company_update_password",company_update_password);
router.post("/assignSkill",assignSkill);

module.exports = router;


/////// http://localhost:3000/Company/assignSkill/     //Forassign skill
/////// for getting all skill         `http://localhost:5001/company/getAllSkills?company_id=${companyID}`

// during add skill-------- send candidate id and skills array thats it


