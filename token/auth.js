const jwt = require("jsonwebtoken");
const User = require("../models/seller");
// const Admin = require("../models/adminModel");

module.exports.sellerGuard = (req,res,next)=>{
    try{
    const token = req.headers.authorization.split(" ")[1];
   const data = jwt.verify(token, 'mysecretkey')
   User.findOne({_id : data.user_id})
   .then((result)=>{
        req.userInfo = result;
        next();
   })
   .catch((e)=>{
       res.json({msg : "Invalid token"})
   })
    }
    catch(e){
        res.json({msg : "Invalid access"})
    }
}