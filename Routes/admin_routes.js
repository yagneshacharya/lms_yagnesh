const express = require("express");
const router = express.Router();
const {
  createAdmin,
  admin_login,
  addCompany,
  deleteCompany,
  getAllcompanies,
  updateCompany,
} = require("../Controllers/admin_controllers");
require("dotenv").config();

const jwt = require("jsonwebtoken");

const jwt_middleware = async (req, res, next) => {
  try {
    let token = req.query.admin_token;
    console.log("Token", token);
    let auth = jwt.verify(token, process.env.KEY);

    console.log("auth", auth);
    if (!auth) {
      res.send({
        message: "invalid authorization",
      });
    }
    if (auth) {
      if (auth.role == "admin") {
        next();
      } else {
        res.send("You are not authorized");
      }
    }
  } catch (error) {
    res.send({
      message: "you are not authorized",
      error: error,
    });
  }
};

router.post("/", createAdmin);
router.get("/admin_login", admin_login);
router.post("/addCompany", jwt_middleware, addCompany);
router.delete("/deleteCompany", jwt_middleware, deleteCompany);
router.get("/getAllcompanies", jwt_middleware, getAllcompanies);
router.put("/updateCompany", jwt_middleware, updateCompany);

module.exports = router;
