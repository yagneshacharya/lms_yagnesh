const { company_model } = require("../Model/admin_schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")



//@ Company login _______________

const company_login = (req, res) => {
  let companyName = req.body.company_name;
  company_model
    .findOne({ company_name: companyName })
    .then((data) => {
     let verifier = bcrypt.compareSync(req.body.password,data.company_password)
      if (!verifier) {
        res.send({
          isSuccess: false,
          message: "wrong password",
        });
      } else if(verifier){
        const token = jwt.sign(
          { company: data.company_name, role: "company" },
          process.env.KEY
        );

        const uobj = {
          company_jwt: token,
        };

        company_model
          .updateOne({ company_name: req.body.company_name }, uobj)
          .then((c_data) => {
            console.log(c_data);
          })
          .catch((err) => {
            console.log(err);
          });   

        res.send({
          message: "sucessed loggin",
          rdata: data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({
        message: "company not found",
        error: err,
      });
    });

};

module.exports = { company_login };
