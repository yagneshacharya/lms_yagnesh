const express = require("express");
const router = express.Router();
const {
  createAdmin,
  admin_login,
  addCompany,
  deleteCompany,
  getAllcompanies,
  updateCompany,
  getCompanyById,
  getAllCompaniesOnly
} = require("../Controllers/admin_controllers");
require("dotenv").config();

const { admin_middlware } = require("../Middlewares/admin_middleware");

router.post("/", createAdmin);
router.post("/admin_login", admin_login);
router.post("/addCompany",addCompany);
router.delete("/deleteCompany", deleteCompany);
router.get("/getAllcompanies", getAllcompanies);
router.get("/getAllCompaniesOnly", getAllCompaniesOnly);
router.get("/getCompanyById", getCompanyById);
router.post("/updateCompany",admin_middlware,updateCompany);

module.exports = router;
