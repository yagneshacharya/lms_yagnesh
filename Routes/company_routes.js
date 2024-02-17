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
  addCourse,
  getAllcourses
} = require("../Controllers/company_controllers");

let company_middleWare = async (req, res, next) => {
  let token = req.query.company_token;

  let auth = jwt.verify(token, process.env.KEY);

  if (!auth)
    res.send({
      message: "invalid authorization",
    });

  try {
    if (auth) {
      if (auth.role == "company") {
        next();
      } else {
        res.send("You are not authorized");
      }
    }
  } catch (error) {
    res.send({
      message: "you are not authorized",
      error: err,
    });
  }
};

router.get("/company_login",company_login);
router.post("/addCandidates", company_middleWare,addCandidates);
router.delete("/deleteCandidates", company_middleWare,deleteCandidates);
router.get("/getAllCandidates", company_middleWare,getAllCandidates);
router.put("/updateCandidates", company_middleWare,updateCandidates);
router.put("/addCourse", company_middleWare,addCourse);
router.get("/getAllcourses", company_middleWare,getAllcourses);

module.exports = router;
