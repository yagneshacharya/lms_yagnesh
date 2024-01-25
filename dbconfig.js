const mongoose = require('mongoose')
require('dotenv')

mongoose.connect(process.env.URL).then(()=>{
     console.log('db has been connected')
})



