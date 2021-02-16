const bcrypt = require('bcrypt');

let pswrd = bcrypt.hashSync('ares123', 10);
console.log(pswrd);