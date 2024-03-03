const jwt = require("jsonwebtoken");

const admin_middlware = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let auth = jwt.verify(token, process.env.KEY);
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

module.exports = { admin_middlware };
