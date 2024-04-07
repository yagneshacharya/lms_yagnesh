const Skill_registration = require("../Model/Skill_model");

const addSkill = async (req, res) => {
       try {
         let { Skill_name, Skill_Description, Sub_skills, companyID } = req.body;

         let Skill = new Skill_registration({
           Skill_name,
           Skill_Description,
           Sub_skills,
           company_id : companyID,
         });

         Skill.save()
           .then((data) => {
          console.log(data)
             res.send(data);
           })
           .catch((err) => {
               console.log('this is your error : ',err)
             res.send(err);
           });
       } catch (error) {
          console.log('this is from catch',error)
         res.send({
           isSuccess: false,
           data: error,
         });
       }
  
};

const getAllSkills = (req, res) => {
     try {
          const company_id = req.query.company_id;
          Skill_registration.find({ company_id })
               .then((data) => {
                    res.send({
                         isSuccess: true,
                         message: "List of skills",
                         response: data,
                    });
               })
               .catch((err) => {
                    res.send({
                         isSuccess: false,
                         message: "skills not found",
                         error: err,
                    });
               });
     } catch (error) {
          res.send({
               isSuccess: false,
               data: error,
          });
     }
};

// Deleting candidates ___________________

const deleteSkill = (req, res) => {

     Skill_registration.findOne({ company_id: req.query.company_id }).then((data) => {

     }).catch((err) => {
          res.send({
               message: `something went wrong`
          })
     })
}; 

// update skill

const updateSkill = (req, res) => {
     let obj = {};

     if (req.body.Skill_name) {
          obj.Skill_name = req.body.Skill_name;
     }
     if (req.body.Skill_Description) {
          obj.Skill_Description = req.body.Skill_Description;
     }
     if (req.body.Sub_skills) {
          obj.Sub_skills = req.body.Sub_skills;
     }
     if (req.body._id) {
          obj._id = req.body._id;
     }

     Skill_registration.findOne({ company_id: req.body.company_id })
          .then(
               Skill_registration.updateOne({ _id: req.body._id }, obj)
                    .then(() => {
                         res.send({
                              isSuccess: true,
                              message: "skill has been updated",
                         });
                    })
                    .catch((err) => {
                         res.send({
                              isSuccess: false,
                              message: "Something went wrong",
                              error: err,
                         });
                    })
          )
          .catch((err) => {
               res.send({
                    isSuccess: false,
                    message: "Company not found",
                    error: err,
               });
          });
};

module.exports = { addSkill, getAllSkills, deleteSkill, updateSkill };
 