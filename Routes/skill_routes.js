const express = require('express')
const router = express.Router()
require("dotenv").config();
// const {company_middleWare} = require('../Middlewares/company_middlewares');
const {addSkill,getAllSkills,deleteSkill,updateSkill} = require('../Controllers/skill_controller')



router.post('/addSkill',addSkill)
router.get('/getAllSkills',getAllSkills)
router.put('/updateSkill',updateSkill)
router.delete('/deleteSkill',deleteSkill)



module.exports = router
