const jwt = require("jsonwebtoken");

const admin_middlware = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    console.log("Token from middlware", token);
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
        console.log("backend ", auth);
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
