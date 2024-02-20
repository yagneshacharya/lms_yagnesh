const jwt = require("jsonwebtoken");

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

module.exports = { company_middleWare };
