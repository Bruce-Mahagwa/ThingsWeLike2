// dependecines
const bcrypt = require("bcryptjs");
// variables
const salt = bcrypt.genSaltSync(2);

const hashPassword = (pwd) => {
  return bcrypt.hashSync(pwd, salt)
}
const comparePassword = (inputPwd, hashedPwd) => {
  return bcrypt.compareSync(inputPwd, hashedPwd);
}
// export
module.exports = {
  hashPassword,
  comparePassword
}