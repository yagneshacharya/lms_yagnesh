const express = require('express');
const app = express();
app.use(express.json())
require('dotenv').config()
require('./dbconfig')




app.listen(process.env.PORT,()=>{
     console.log(`Server has been started at ${process.env.PORT}`)
}) 