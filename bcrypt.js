const bcrypt = require('bcrypt');


let password = '1234'
const e_pass = bcrypt.hashSync(password,10)
const ans = bcrypt.compareSync('1234',e_pass)
console.log(e_pass,ans);

