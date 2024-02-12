const { company_model } = require("../Model/admin_schema");

// Company login _______________

const company_login = (req, res) => {
  let ui_pass = req.body.password;
  company_model
    .findOne({ company_name: req.body.company_name })
    .then((data) => {
      console.log(data.company_name, company_name);
      if (ui_pass !== data.company_password) {
        res.send({
          isSuccess: false,
          message: "wrong password",
        });
      } else {
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
          isSuccess: true,
          message: "Dear company you are logged in",
          rData: data,
        });
      }
    })
    .catch((err) => {
      res.send({ error: err, message: "company not found" });
    });
};

module.exports = { company_login };
