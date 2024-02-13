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
} = require("../Controllers/company_controllers");

router.use(async (req, res, next) => {
  let token = req.query.admin_token;

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
});

router.get("/company_login", company_login);
router.post("/addCandidates", addCandidates);
router.delete("/deleteCandidates", deleteCandidates);
router.get("/getAllCandidates", getAllCandidates);
router.put("/updateCandidates", updateCandidates);

module.exports = router;
