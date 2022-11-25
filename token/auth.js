const jwt = require("jsonwebtoken");
const Seller = require("../models/seller");

module.exports.sellerGuard = (req,res,next)=>{
    try{
    const token = req.headers.authorization.split(" ")[1];
   const data = jwt.verify(token, 'mysecretkey')
   Seller.findOne({_id : data.id})
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