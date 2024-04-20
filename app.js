const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors({
     origin: "*",
     credentials: true
}))

app.use(express.json())
require('dotenv').config()
require('./dbconfig')

 
const adminRoutes = require('./Routes/admin_routes');
const companyRoutes = require('./Routes/company_routes')
const skillRoutes = require('./Routes/skill_routes')
const candidateRoutes = require('./Routes/candidate_routes')



app.use('/admin', adminRoutes)
app.use('/company', companyRoutes)
app.use('/company',skillRoutes)
app.use('/candidate',candidateRoutes)

app.listen(process.env.PORT, () => {
     console.log(`Server has been started at ${process.env.PORT}`)
})

