const jwt = require('jsonwebtoken')
const token = (user) =>{
  return jwt.sign(
    {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phonenumber: user.phonenumber,
      password: user.password
    },
    "anysecrets",
    {
      expiresIn: '48h',
    }
  );
}
  module.exports = token;